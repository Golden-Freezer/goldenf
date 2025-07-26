'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tags,
  Upload,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Search,
  Palette,
} from 'lucide-react';

const navigationItems = [
  {
    title: '대시보드',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: '게시글 관리',
    href: '/admin/posts',
    icon: FileText,
    children: [
      { title: '전체 게시글', href: '/admin/posts' },
      { title: '새 게시글 작성', href: '/admin/posts/new' },
      { title: '임시저장 글', href: '/admin/posts/drafts' },
    ],
  },
  {
    title: '카테고리 관리',
    href: '/admin/categories',
    icon: FolderOpen,
  },
  {
    title: '태그 관리',
    href: '/admin/tags',
    icon: Tags,
  },
  {
    title: '파일 관리',
    href: '/admin/files',
    icon: Upload,
    children: [
      { title: '파일 목록', href: '/admin/files' },
      { title: '파일 업로드', href: '/admin/files/upload' },
    ],
  },
  {
    title: '댓글 관리',
    href: '/admin/comments',
    icon: MessageSquare,
  },
  {
    title: '사용자 관리',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: '통계 및 분석',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'SEO 도구',
    href: '/admin/seo',
    icon: Search,
    children: [
      { title: 'SEO 설정', href: '/admin/seo' },
      { title: '메타 데이터', href: '/admin/seo/meta' },
      { title: '구조화된 데이터', href: '/admin/seo/structured-data' },
    ],
  },
  {
    title: '디자인 설정',
    href: '/admin/design',
    icon: Palette,
  },
  {
    title: '사이트 설정',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
            {item.children && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-3 py-2 text-sm rounded-md transition-colors',
                      pathname === child.href
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}