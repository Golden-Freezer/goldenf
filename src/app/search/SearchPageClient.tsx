'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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

export default function SearchPageClient() {
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
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // 카테고리 필터
    if (filters.category !== 'all') {
      results = results.filter(post => post.category.id === filters.category);
    }

    // 날짜 필터
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
      default:
        // relevance - keep current order for now
        break;
    }

    return results;
  }, [query, filters]);

  // URL 업데이트
  useEffect(() => {
    if (query) {
      const url = new URL(window.location.href);
      url.searchParams.set('q', query);
      window.history.replaceState({}, '', url.toString());
    }
  }, [query]);

  const clearFilters = () => {
    setFilters({
      category: 'all',
      dateRange: 'all',
      sortBy: 'relevance'
    });
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-700 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="min-h-screen py-20">
        <div className="container-modern">
          {/* Search Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              총무 업무 검색
            </h1>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {searchResults.length > 0 ? (
                  <>
                    <strong>{formatNumber(searchResults.length)}</strong>개의 결과
                    {query && <> "<strong>{query}</strong>"에 대한</>}
                  </>
                ) : (
                  <>검색 결과가 없습니다</>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                필터
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        카테고리
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => setFilters({...filters, category: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="all">전체</option>
                        {BLOG_CATEGORIES.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        기간
                      </label>
                      <select
                        value={filters.dateRange}
                        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="all">전체</option>
                        <option value="week">최근 1주일</option>
                        <option value="month">최근 1개월</option>
                        <option value="year">최근 1년</option>
                      </select>
                    </div>

                    {/* Sort Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        정렬
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                      >
                        <option value="relevance">관련도순</option>
                        <option value="date">최신순</option>
                        <option value="views">조회수순</option>
                        <option value="likes">좋아요순</option>
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      필터 초기화
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Search Results */}
          <div className="max-w-6xl mx-auto">
            {searchResults.length > 0 ? (
              <div className="space-y-6">
                {searchResults.map((post, index) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Thumbnail */}
                        {post.thumbnail && (
                          <div className="lg:w-48 lg:flex-shrink-0">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <FileText className="w-8 h-8" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1">
                          {/* Category & Meta */}
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge 
                              variant="secondary"
                              style={{ 
                                backgroundColor: `${post.category.color}20`, 
                                color: post.category.color 
                              }}
                            >
                              {post.category.name}
                            </Badge>
                            
                            {post.featured && (
                              <Badge variant="outline" className="text-amber-600 border-amber-600">
                                추천글
                              </Badge>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(post.publishedAt, 'short')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {post.readingTime}분
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {formatNumber(post.views)}
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {post.likes}
                              </div>
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                              {highlightText(post.title, query)}
                            </Link>
                          </h2>

                          {/* Excerpt */}
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                            {highlightText(post.excerpt, query)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map(tag => (
                              <span 
                                key={tag}
                                className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                              >
                                <Tag className="w-3 h-3" />
                                {highlightText(tag, query)}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{post.tags.length - 3}개
                              </span>
                            )}
                          </div>

                          {/* Read More */}
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                          >
                            자세히 보기
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  다른 검색어를 시도하거나 필터를 조정해보세요.
                </p>
                <Link href="/blog">
                  <Button variant="outline">
                    전체 글 보기
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}