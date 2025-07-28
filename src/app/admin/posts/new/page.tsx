'use client';

import { PostEditor } from '@/components/admin/posts/PostEditor';

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">새 게시글 작성</h1>
      <PostEditor />
    </div>
  );
}