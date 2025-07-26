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

const categoryOptions = [
  { value: 'all', label: '전체 카테고리' },
  { value: 'DOCUMENT', label: '문서' },
  { value: 'PROGRAM', label: '프로그램' },
  { value: 'IMAGE', label: '이미지' },
  { value: 'SPREADSHEET', label: '스프레드시트' },
  { value: 'PRESENTATION', label: '프레젠테이션' },
  { value: 'ARCHIVE', label: '압축파일' },
  { value: 'OTHER', label: '기타' },
];

const publicOptions = [
  { value: 'all', label: '전체' },
  { value: 'public', label: '공개' },
  { value: 'private', label: '비공개' },
];

const sortOptions = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'filename', label: '파일명순' },
  { value: 'size', label: '크기순' },
];

export function FilesFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPublic, setSelectedPublic] = useState('all');
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

  const handlePublicChange = (value: string) => {
    setSelectedPublic(value);
    updateActiveFilters('public', value);
  };

  const updateActiveFilters = (type: string, value: string) => {
    const filterLabel = type === 'category' 
      ? categoryOptions.find(cat => cat.value === value)?.label || '전체 카테고리'
      : publicOptions.find(pub => pub.value === value)?.label || '전체';
    
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
    } else if (type === 'public') {
      setSelectedPublic('all');
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedPublic('all');
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
                placeholder="파일명으로 검색..."
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
              {categoryOptions.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Public Filter */}
          <Select value={selectedPublic} onValueChange={handlePublicChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="공개 여부" />
            </SelectTrigger>
            <SelectContent>
              {publicOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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