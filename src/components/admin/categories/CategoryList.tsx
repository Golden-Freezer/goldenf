'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, MoreVertical, Eye } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BLOG_CATEGORIES } from '@/lib/constants';

export function CategoryList() {
  const handleEdit = (categoryId: string) => {
    console.log('Edit category:', categoryId);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('이 카테고리를 삭제하시겠습니까?')) {
      console.log('Delete category:', categoryId);
    }
  };

  const handleToggleActive = (categoryId: string) => {
    console.log('Toggle category active:', categoryId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {BLOG_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge variant="secondary">
                  {category.postCount}개 게시글
                </Badge>
                <Badge variant="outline" className="text-green-600">
                  활성
                </Badge>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(category.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      편집
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      게시글 보기
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}