'use client';

import { useState } from 'react';
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
import { Eye, MessageSquare, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data - replace with actual data from your API
const posts = [
  {
    id: '1',
    title: '총무 업무 효율화를 위한 디지털 도구 활용법',
    category: '사무관리',
    status: 'PUBLISHED',
    publishedAt: '2024-01-15',
    viewCount: 1247,
    commentCount: 8,
    author: '관리자',
  },
  {
    id: '2',
    title: '2024년 인사관리 트렌드와 총무의 역할 변화',
    category: '인사관리',
    status: 'PUBLISHED',
    publishedAt: '2024-01-12',
    viewCount: 856,
    commentCount: 12,
    author: '관리자',
  },
  {
    id: '3',
    title: '계약서 검토 시 반드시 확인해야 할 체크리스트',
    category: '법무/계약',
    status: 'DRAFT',
    publishedAt: null,
    viewCount: 0,
    commentCount: 0,
    author: '관리자',
  },
  {
    id: '4',
    title: '예산 관리 엑셀 템플릿과 활용 가이드',
    category: '예산/재무',
    status: 'PUBLISHED',
    publishedAt: '2024-01-10',
    viewCount: 2340,
    commentCount: 15,
    author: '관리자',
  },
  {
    id: '5',
    title: '사무실 보안 관리 실무 매뉴얼',
    category: '시설관리',
    status: 'PUBLISHED',
    publishedAt: '2024-01-08',
    viewCount: 543,
    commentCount: 3,
    author: '관리자',
  },
];

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
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

  const handleDeletePost = (postId: string) => {
    // Implement delete functionality
    console.log('Delete post:', postId);
  };

  const handleToggleSelect = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>전체 게시글</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
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
                    <Badge variant="secondary">{post.category}</Badge>
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
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
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
                          <Link href={`/blog/${post.id}`} target="_blank">
                            <Eye className="w-4 h-4 mr-2" />
                            미리보기
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeletePost(post.id)}
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

        {selectedPosts.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">
              {selectedPosts.length}개 항목이 선택됨
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                일괄 편집
              </Button>
              <Button variant="destructive" size="sm">
                일괄 삭제
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}