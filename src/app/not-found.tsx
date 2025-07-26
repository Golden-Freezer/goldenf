'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { 
  Home,
  FileQuestion,
  ArrowLeft,
  Search,
  BookOpen
} from 'lucide-react';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full flex items-center justify-center">
                <FileQuestion className="w-16 h-16 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            페이지를 찾을 수 없습니다
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br className="hidden md:inline" />
            아래 링크를 통해 원하시는 정보를 찾아보세요.
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="btn-modern btn-primary flex items-center gap-2">
                <Home className="w-5 h-5" />
                홈으로 가기
              </Button>
            </Link>
            
            <Link href="/blog">
              <Button size="lg" variant="outline" className="btn-modern btn-secondary flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                전체 글 보기
              </Button>
            </Link>

            <Link href="/search">
              <Button size="lg" variant="outline" className="btn-modern btn-secondary flex items-center gap-2">
                <Search className="w-5 h-5" />
                검색하기
              </Button>
            </Link>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              다음을 확인해보세요:
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span>웹 주소가 정확히 입력되었는지 확인해주세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span>찾으시는 콘텐츠가 다른 카테고리로 이동되었을 수 있습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                <span>검색 기능을 사용하여 원하시는 정보를 찾아보세요.</span>
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 페이지로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}