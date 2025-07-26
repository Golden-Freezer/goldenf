import { CategoryList } from '@/components/admin/categories/CategoryList';
import { CategoryForm } from '@/components/admin/categories/CategoryForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">카테고리 관리</h1>
          <p className="text-gray-600 mt-1">총무 업무 관련 카테고리를 관리합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryList />
        </div>
        <div>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
}