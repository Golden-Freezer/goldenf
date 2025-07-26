import { PostEditor } from '@/components/admin/posts/PostEditor';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">새 게시글 작성</h1>
          <p className="text-gray-600 mt-1">총무 업무 관련 새로운 게시글을 작성합니다</p>
        </div>
      </div>

      <PostEditor />
    </div>
  );
}