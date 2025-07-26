'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Upload,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    title: '새 게시글 작성',
    description: '총무 업무 관련 새 글 작성',
    href: '/admin/posts/new',
    icon: Plus,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: '파일 업로드',
    description: '문서 및 프로그램 업로드',
    href: '/admin/files/upload',
    icon: Upload,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: '댓글 승인',
    description: '대기 중인 댓글 검토',
    href: '/admin/comments',
    icon: MessageSquare,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    title: '사용자 관리',
    description: '회원 가입 승인 및 관리',
    href: '/admin/users',
    icon: Users,
    color: 'bg-orange-500 hover:bg-orange-600',
  },
];

const systemStatus = [
  {
    label: '시스템 상태',
    status: 'healthy',
    value: '정상',
  },
  {
    label: '데이터베이스',
    status: 'healthy',
    value: '연결됨',
  },
  {
    label: '파일 저장소',
    status: 'warning',
    value: '용량 주의',
  },
  {
    label: '백업',
    status: 'healthy',
    value: '최신',
  },
];

const pendingTasks = [
  {
    id: '1',
    title: '댓글 승인 대기',
    count: 5,
    type: 'comment',
  },
  {
    id: '2',
    title: '파일 검토 필요',
    count: 2,
    type: 'file',
  },
  {
    id: '3',
    title: '사용자 승인 대기',
    count: 1,
    type: 'user',
  },
];

export function QuickActions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>빠른 실행</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="w-full justify-start h-auto p-4"
              asChild
            >
              <Link href={action.href}>
                <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>대기 중인 작업</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">{task.title}</span>
              </div>
              <Badge variant="secondary">{task.count}</Badge>
            </div>
          ))}
          {pendingTasks.length === 0 && (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-sm">모든 작업이 처리되었습니다</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>시스템 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStatus.map((status) => (
            <div key={status.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{status.label}</span>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    status.status === 'healthy'
                      ? 'bg-green-500'
                      : status.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">{status.value}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}