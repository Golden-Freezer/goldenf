'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Eye, MessageSquare, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual data from your API
const recentPosts = [
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

export function RecentPosts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>최근 게시글</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/posts">전체 보기</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900 truncate">
                    {post.title}
                  </h3>
                  <Badge variant="secondary" className={getStatusColor(post.status)}>
                    {getStatusText(post.status)}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.category}</span>
                  {post.publishedAt && (
                    <span>{formatDate(post.publishedAt)}</span>
                  )}
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/admin/posts/${post.id}/edit`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}