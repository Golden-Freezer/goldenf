'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';

const statusOptions = [
  { value: 'all', label: '전체 상태' },
  { value: 'published', label: '게시됨' },
  { value: 'draft', label: '임시저장' },
  { value: 'archived', label: '보관됨' },
];

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'title', label: '제목순' },
  { value: 'views', label: '조회수순' },
  { value: 'comments', label: '댓글순' },
];

export function PostsFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    // Implement search logic
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateActiveFilters('category', value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    updateActiveFilters('status', value);
  };

  const updateActiveFilters = (type: string, value: string) => {
    const filterLabel = type === 'category' 
      ? BLOG_CATEGORIES.find(cat => cat.slug === value)?.name || '전체 카테고리'
      : statusOptions.find(status => status.value === value)?.label || '전체 상태';
    
    if (value !== 'all') {
      setActiveFilters(prev => {
        const filtered = prev.filter(filter => !filter.startsWith(type));
        return [...filtered, `${type}:${filterLabel}`];
      });
    } else {
      setActiveFilters(prev => prev.filter(filter => !filter.startsWith(type)));
    }
  };

  const removeFilter = (filterToRemove: string) => {
    const [type] = filterToRemove.split(':');
    setActiveFilters(prev => prev.filter(filter => filter !== filterToRemove));
    
    if (type === 'category') {
      setSelectedCategory('all');
    } else if (type === 'status') {
      setSelectedStatus('all');
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setActiveFilters([]);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="게시글 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              {BLOG_CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="상태" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((sort) => (
                <SelectItem key={sort.value} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          {activeFilters.length > 0 && (
            <Button variant="outline" onClick={clearAllFilters}>
              <X className="w-4 h-4 mr-2" />
              필터 초기화
            </Button>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-gray-600 flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              활성 필터:
            </span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
                onClick={() => removeFilter(filter)}
              >
                {filter.split(':')[1]}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}