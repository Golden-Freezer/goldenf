import { PostsList } from '@/components/admin/posts/PostsList';
import { PostsFilters } from '@/components/admin/posts/PostsFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">게시글 관리</h1>
          <p className="text-gray-600 mt-1">총무 업무 관련 게시글을 관리합니다</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            새 게시글 작성
          </Link>
        </Button>
      </div>

      <PostsFilters />
      
      <PostsList />
    </div>
  );
}