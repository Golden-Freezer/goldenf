'use client';

import { useEffect, useState } from 'react';
import { PostEditor } from '@/components/admin/posts/PostEditor';
import { getPostBySlug } from '@/lib/database';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EditPostClientProps {
  postId: string;
}

export function EditPostClient({ postId }: EditPostClientProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get post by ID instead of slug for editing
        const { data, error: fetchError } = await supabase
          .from('posts')
          .select(`
            *,
            author:users(id, name, email),
            category:categories(id, name, slug, color),
            tags:post_tags(tag:tags(id, name, slug, color))
          `)
          .eq('id', postId)
          .single();

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        setPost(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '포스트를 불러오는데 실패했습니다.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      loadPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center text-red-600">
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center text-gray-600">
          <p className="text-lg">게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">게시글 편집</h1>
      <PostEditor postId={postId} initialData={post} />
    </div>
  );
}