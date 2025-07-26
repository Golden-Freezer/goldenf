'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { samplePosts } from '@/data/sample-posts';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { formatDate, formatNumber } from '@/lib/utils';
import {
  Search,
  X,
  Filter,
  Clock,
  Eye,
  Heart,
  FileText,
  Tag,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface SearchFilters {
  category: string;
  dateRange: string;
  sortBy: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    dateRange: 'all',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  // 검색 결과 필터링
  const searchResults = useMemo(() => {
    let results = [...samplePosts];
    
    // 검색어로 필터링
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // 카테고리 필터
    if (filters.category !== 'all') {
      results = results.filter(post => post.category.id === filters.category);
    }
    
    // 날짜 범위 필터
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      results = results.filter(post => new Date(post.publishedAt) >= filterDate);
    }
    
    // 정렬
    switch (filters.sortBy) {
      case 'date':
        results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'views':
        results.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        results.sort((a, b) => b.likes - a.likes);
        break;
      // relevance는 기본 순서 유지
    }
    
    return results;
  }, [query, filters]);

  // 검색어 하이라이팅
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-900 text-inherit">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-20">
        <div className="container-modern">
          {/* Search Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              검색
            </h1>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-24 py-4 text-lg rounded-xl border-2 focus:border-blue-500 dark:focus:border-blue-400"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ? 'default' : 'outline'}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {/* Popular Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">인기 검색어:</span>
              {['인사관리', '법무', '시설관리', '예산', '복리후생', '계약서'].map(tag => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950"
                  onClick={() => setQuery(tag)}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="max-w-3xl mx-auto mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    카테고리
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="all">전체</option>
                    {BLOG_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.postCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    기간
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="all">전체 기간</option>
                    <option value="week">최근 1주일</option>
                    <option value="month">최근 1개월</option>
                    <option value="year">최근 1년</option>
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    정렬
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="relevance">관련도순</option>
                    <option value="date">최신순</option>
                    <option value="views">조회순</option>
                    <option value="likes">인기순</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="max-w-4xl mx-auto">
            {/* Results Summary */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {query ? (
                  <>
                    <span className="text-gray-900 dark:text-white">"{query}"</span>에 대한 검색 결과{' '}
                    <span className="text-blue-600 dark:text-blue-400">{searchResults.length}개</span>
                  </>
                ) : (
                  <>
                    전체 글{' '}
                    <span className="text-blue-600 dark:text-blue-400">{searchResults.length}개</span>
                  </>
                )}
              </h2>
              {query && searchResults.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setFilters({
                      category: 'all',
                      dateRange: 'all',
                      sortBy: 'relevance'
                    });
                  }}
                >
                  초기화
                </Button>
              )}
            </div>

            {/* Results List */}
            {searchResults.length > 0 ? (
              <div className="space-y-6">
                {searchResults.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: post.category.color + '15',
                              color: post.category.color
                            }}
                          >
                            {post.category.icon} {post.category.name}
                          </Badge>
                          {post.featured && (
                            <Badge variant="outline" className="text-amber-600 border-amber-600">
                              추천글
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt, 'short')}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {highlightText(post.title, query)}
                        </Link>
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {highlightText(post.excerpt, query)}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {highlightText(tag, query)}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime}분
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatNumber(post.views)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.likes}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  다른 검색어를 시도하거나 필터를 조정해보세요.
                </p>
                <Link href="/blog">
                  <Button variant="outline" className="flex items-center gap-2">
                    전체 글 보기
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="min-h-screen py-20">
          <div className="container-modern">
            <div className="max-w-3xl mx-auto mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                검색
              </h1>
              <div className="animate-pulse">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    }>
      <SearchContent />
    </Suspense>
  );
}