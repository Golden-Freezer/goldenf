import { supabase, createServerSupabaseClient } from './supabase'
import { Database } from '@/types/supabase'
import { PostStatus, CommentStatus, FileCategory } from '@/types/supabase'

type Tables = Database['public']['Tables']
type Post = Tables['posts']['Row']
type PostInsert = Tables['posts']['Insert']
type PostUpdate = Tables['posts']['Update']
type Category = Tables['categories']['Row']
type Tag = Tables['tags']['Row']
type Comment = Tables['comments']['Row']
type FileUpload = Tables['file_uploads']['Row']

// Posts
export const getPosts = async (options?: {
  status?: PostStatus
  categoryId?: string
  limit?: number
  offset?: number
  search?: string
}) => {
  let query = supabase
    .from('posts')
    .select(`
      *,
      author:users(id, name, email),
      category:categories(id, name, slug, color),
      tags:post_tags(tag:tags(id, name, slug, color))
    `)
    .order('createdAt', { ascending: false })

  if (options?.status) {
    query = query.eq('status', options.status)
  }

  if (options?.categoryId) {
    query = query.eq('categoryId', options.categoryId)
  }

  if (options?.search) {
    query = query.or(`title.ilike.%${options.search}%,content.ilike.%${options.search}%`)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, (options.offset + (options?.limit || 10)) - 1)
  }

  const { data, error } = await query

  if (error) {
    console.error('Get posts error:', error)
    throw new Error(`포스트 조회 실패: ${error.message}`)
  }

  return data
}

export const getPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:users(id, name, email),
      category:categories(id, name, slug, color),
      tags:post_tags(tag:tags(id, name, slug, color)),
      comments:comments(
        *,
        author:users(id, name),
        replies:comments(*)
      ),
      uploads:post_uploads(file:file_uploads(*))
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Get post by slug error:', error)
    throw new Error(`포스트 조회 실패: ${error.message}`)
  }

  return data
}

export const createPost = async (postData: PostInsert) => {
  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select()
    .single()

  if (error) {
    console.error('Create post error:', error)
    throw new Error(`포스트 생성 실패: ${error.message}`)
  }

  return data
}

export const updatePost = async (id: string, postData: PostUpdate) => {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Update post error:', error)
    throw new Error(`포스트 수정 실패: ${error.message}`)
  }

  return data
}

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete post error:', error)
    throw new Error(`포스트 삭제 실패: ${error.message}`)
  }
}

export const incrementPostViewCount = async (id: string) => {
  const { error } = await supabase
    .rpc('increment_post_view_count', { post_id: id })

  if (error) {
    console.error('Increment view count error:', error)
  }
}

// Categories
export const getCategories = async (activeOnly = true) => {
  let query = supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true })

  if (activeOnly) {
    query = query.eq('isActive', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Get categories error:', error)
    throw new Error(`카테고리 조회 실패: ${error.message}`)
  }

  return data
}

export const getCategoryBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Get category by slug error:', error)
    throw new Error(`카테고리 조회 실패: ${error.message}`)
  }

  return data
}

// Tags
export const getTags = async (activeOnly = true) => {
  let query = supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (activeOnly) {
    query = query.eq('isActive', true)
  }

  const { data, error } = await query

  if (error) {
    console.error('Get tags error:', error)
    throw new Error(`태그 조회 실패: ${error.message}`)
  }

  return data
}

export const getTagBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Get tag by slug error:', error)
    throw new Error(`태그 조회 실패: ${error.message}`)
  }

  return data
}

// Comments
export const getCommentsByPostId = async (postId: string, status: CommentStatus = 'APPROVED') => {
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
    .eq('status', status)
    .is('parentId', null)
    .order('createdAt', { ascending: true })

  if (error) {
    console.error('Get comments error:', error)
    throw new Error(`댓글 조회 실패: ${error.message}`)
  }

  return data
}

export const createComment = async (commentData: {
  content: string
  postId: string
  authorId?: string
  parentId?: string
  guestName?: string
  guestEmail?: string
  ipAddress?: string
}) => {
  const { data, error } = await supabase
    .from('comments')
    .insert(commentData)
    .select()
    .single()

  if (error) {
    console.error('Create comment error:', error)
    throw new Error(`댓글 작성 실패: ${error.message}`)
  }

  return data
}

// File Uploads
export const getFileUploads = async (uploaderId?: string, category?: FileCategory) => {
  let query = supabase
    .from('file_uploads')
    .select(`
      *,
      uploader:users(id, name)
    `)
    .order('createdAt', { ascending: false })

  if (uploaderId) {
    query = query.eq('uploaderId', uploaderId)
  }

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Get file uploads error:', error)
    throw new Error(`파일 조회 실패: ${error.message}`)
  }

  return data
}

export const createFileUpload = async (fileData: {
  filename: string
  originalName: string
  mimeType: string
  size: number
  path: string
  url?: string
  category?: FileCategory
  description?: string
  version?: string
  isPublic?: boolean
  uploaderId: string
}) => {
  const { data, error } = await supabase
    .from('file_uploads')
    .insert(fileData)
    .select()
    .single()

  if (error) {
    console.error('Create file upload error:', error)
    throw new Error(`파일 업로드 기록 실패: ${error.message}`)
  }

  return data
}

// Site Settings
export const getSiteSetting = async (key: string) => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', key)
    .single()

  if (error) {
    console.error('Get site setting error:', error)
    return null
  }

  return data
}

export const setSiteSetting = async (key: string, value: string, type = 'string') => {
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ key, value, type }, { onConflict: 'key' })
    .select()
    .single()

  if (error) {
    console.error('Set site setting error:', error)
    throw new Error(`사이트 설정 저장 실패: ${error.message}`)
  }

  return data
}

// Search functionality
export const searchContent = async (query: string, limit = 10) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      publishedAt,
      category:categories(name),
      author:users(name)
    `)
    .eq('status', 'PUBLISHED')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('publishedAt', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Search content error:', error)
    throw new Error(`검색 실패: ${error.message}`)
  }

  return data
}

// Statistics
export const getPostStats = async () => {
  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: totalComments }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'DRAFT'),
    supabase.from('comments').select('*', { count: 'exact', head: true }).eq('status', 'APPROVED')
  ])

  return {
    totalPosts: totalPosts || 0,
    publishedPosts: publishedPosts || 0,
    draftPosts: draftPosts || 0,
    totalComments: totalComments || 0
  }
}