'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, MessageSquare, Eye, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    title: '전체 게시글',
    value: '47',
    change: '+3',
    changeType: 'increase',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: '이번 달 방문자',
    value: '2,847',
    change: '+12%',
    changeType: 'increase',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: '댓글',
    value: '186',
    change: '+5',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: '등록된 사용자',
    value: '23',
    change: '+2',
    changeType: 'increase',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: '평균 조회수',
    value: '1,247',
    change: '+8%',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    title: '평균 읽기 시간',
    value: '3분 24초',
    change: '+12초',
    changeType: 'increase',
    icon: Clock,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
];

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center text-xs mt-1">
              <span className="text-green-600 font-medium">{stat.change}</span>
              <span className="text-gray-500 ml-1">지난 주 대비</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}