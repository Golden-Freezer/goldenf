'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { Eye, MessageSquare, Edit, Trash2, MoreHorizontal, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { getPosts, deletePost } from '@/lib/database';
import { PostStatus } from '@/types/supabase';
import { useSupabaseSubscription } from '@/hooks/useSupabase';

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: PostStatus;
  publishedAt: string | null;
  viewCount: number;
  commentCount: number;
  categoryId: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string | null;
    email: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
    color: string | null;
  };
  tags?: {
    tag: {
      id: string;
      name: string;
      slug: string;
      color: string | null;
    };
  }[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800';
    case 'DRAFT':
      return 'bg-yellow-100 text-yellow-800';
    case 'ARCHIVED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'PUBLISHED':
      return '게시됨';
    case 'DRAFT':
      return '임시저장';
    case 'ARCHIVED':
      return '보관됨';
    default:
      return '알 수 없음';
  }
};

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Subscribe to real-time updates
  useSupabaseSubscription('posts', (payload) => {
    if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
      loadPosts();
    }
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosts();
      setPosts(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '포스트를 불러오는데 실패했습니다.';
      setError(errorMessage);
      toast({
        title: '오류',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!deletePostId) return;
    
    try {
      setDeleting(true);
      await deletePost(deletePostId);
      
      toast({
        title: '성공',
        description: '게시글이 삭제되었습니다.',
      });
      
      // Reload posts
      await loadPosts();
      
      // Remove from selected posts if it was selected
      setSelectedPosts(prev => prev.filter(id => id !== deletePostId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.';
      toast({
        title: '오류',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeletePostId(null);
    }
  };

  const handleToggleSelect = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    
    try {
      setDeleting(true);
      await Promise.all(selectedPosts.map(postId => deletePost(postId)));
      
      toast({
        title: '성공',
        description: `${selectedPosts.length}개의 게시글이 삭제되었습니다.`,
      });
      
      setSelectedPosts([]);
      await loadPosts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '일괄 삭제에 실패했습니다.';
      toast({
        title: '오류',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>전체 게시글</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
              <Button onClick={loadPosts} variant="outline" className="mt-4">
                다시 시도
              </Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>게시글이 없습니다.</p>
              <Link href="/admin/posts/new">
                <Button className="mt-4">첫 게시글 작성하기</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedPosts.length === posts.length && posts.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPosts(posts.map(p => p.id));
                          } else {
                            setSelectedPosts([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>발행일</TableHead>
                    <TableHead>조회수</TableHead>
                    <TableHead>댓글</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead className="w-20">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedPosts.includes(post.id)}
                          onChange={() => handleToggleSelect(post.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Link 
                          href={`/admin/posts/${post.id}/edit`}
                          className="font-medium text-primary hover:underline"
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {post.category ? (
                          <Badge variant="secondary">{post.category.name}</Badge>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>
                          {getStatusText(post.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {post.publishedAt ? formatDate(post.publishedAt) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1 text-gray-400" />
                          {post.viewCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1 text-gray-400" />
                          {post.commentCount}
                        </div>
                      </TableCell>
                      <TableCell>{post.author?.name || post.author?.email || '-'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" disabled={deleting}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/posts/${post.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                편집
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/blog/${post.slug}`} target="_blank">
                                <Eye className="w-4 h-4 mr-2" />
                                미리보기
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setDeletePostId(post.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

        {selectedPosts.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">
              {selectedPosts.length}개 항목이 선택됨
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                일괄 편집
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    삭제 중...
                  </>
                ) : (
                  '일괄 삭제'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>

    {/* Delete Confirmation Dialog */}
    <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            이 게시글을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeletePost}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                삭제 중...
              </>
            ) : (
              '삭제'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}