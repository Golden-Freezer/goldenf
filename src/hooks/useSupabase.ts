'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']

// Hook for real-time subscriptions
export function useSupabaseSubscription<T = any>(
  table: keyof Tables,
  callback: (payload: any) => void,
  filter?: string
) {
  const { data: session } = useSession()
  
  useEffect(() => {
    if (!session?.user) return

    let subscription = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table as string,
          filter: filter
        },
        callback
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, callback, filter, session])
}

// Hook for real-time comments
export function useRealtimeComments(postId: string) {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial load
    const loadComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          author:users(id, name),
          replies:comments(
            *,
            author:users(id, name)
          )
        `)
        .eq('postId', postId)
        .eq('status', 'APPROVED')
        .is('parentId', null)
        .order('createdAt', { ascending: true })

      if (!error && data) {
        setComments(data)
      }
      setLoading(false)
    }

    loadComments()

    // Real-time subscription
    const subscription = supabase
      .channel('comments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `postId=eq.${postId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Add new comment
            loadComments() // Reload to get full relations
          } else if (payload.eventType === 'UPDATE') {
            // Update existing comment
            setComments(prev => 
              prev.map(comment => 
                comment.id === payload.new.id 
                  ? { ...comment, ...payload.new }
                  : comment
              )
            )
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted comment
            setComments(prev => 
              prev.filter(comment => comment.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [postId])

  return { comments, loading, refetch: () => setLoading(true) }
}

// Hook for file uploads with progress
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (
    file: File,
    options?: {
      description?: string
      version?: string
      isPublic?: boolean
    }
  ) => {
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      if (options?.description) {
        formData.append('description', options.description)
      }
      if (options?.version) {
        formData.append('version', options.version)
      }
      formData.append('isPublic', String(options?.isPublic || false))

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '업로드 실패')
      }

      setProgress(100)
      return result.file
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '업로드 실패'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const deleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/upload?id=${fileId}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '삭제 실패')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '삭제 실패'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  return {
    uploading,
    progress,
    error,
    uploadFile,
    deleteFile,
    resetError: () => setError(null)
  }
}

// Hook for search functionality
export function useSearch() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string, limit = 10) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data, error: searchError } = await supabase
        .rpc('search_posts_ranked', {
          search_query: query,
          post_limit: limit
        })

      if (searchError) {
        throw new Error(searchError.message)
      }

      setResults(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '검색 실패'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    results,
    loading,
    error,
    search,
    clearResults: () => setResults([])
  }
}

// Hook for visitor logging
export function useVisitorLog() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        const response = await fetch('/api/visitor-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            path: window.location.pathname,
            referer: document.referrer || null
          })
        })
      } catch (error) {
        // Silently fail - visitor logging is not critical
        console.debug('Visitor logging failed:', error)
      }
    }

    logVisit()
  }, [])
}

// Hook for popular posts
export function usePopularPosts(daysBack = 30, limit = 5) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPopularPosts = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_popular_posts', {
            days_back: daysBack,
            post_limit: limit
          })

        if (!error && data) {
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to load popular posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPopularPosts()
  }, [daysBack, limit])

  return { posts, loading }
}

// Hook for related posts
export function useRelatedPosts(currentPostId: string, limit = 5) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRelatedPosts = async () => {
      try {
        const { data, error } = await supabase
          .rpc('get_related_posts', {
            current_post_id: currentPostId,
            post_limit: limit
          })

        if (!error && data) {
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to load related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    if (currentPostId) {
      loadRelatedPosts()
    }
  }, [currentPostId, limit])

  return { posts, loading }
}