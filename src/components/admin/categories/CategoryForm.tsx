'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/admin/common/ColorPicker';
import { EmojiPicker } from '@/components/admin/common/EmojiPicker';
import { Save, X } from 'lucide-react';
import { generateSlug } from '@/lib/utils';

interface CategoryData {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export function CategoryForm() {
  const [formData, setFormData] = useState<CategoryData>({
    name: '',
    slug: '',
    description: '',
    color: '#3b82f6',
    icon: '📁',
    order: 0,
    isActive: true,
  });

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      slug: generateSlug(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      alert('카테고리 이름을 입력하세요.');
      return;
    }

    // Submit form data
    console.log('Submitting category:', formData);
    
    // Reset form
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6',
      icon: '📁',
      order: 0,
      isActive: true,
    });

    alert('카테고리가 생성되었습니다.');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#3b82f6',
      icon: '📁',
      order: 0,
      isActive: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>새 카테고리 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">카테고리 이름 *</Label>
            <Input
              id="name"
              placeholder="예: 인사관리"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL 슬러그</Label>
            <Input
              id="slug"
              placeholder="hr-management"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="카테고리에 대한 간단한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>카테고리 색상</Label>
              <ColorPicker
                color={formData.color}
                onChange={(color) => setFormData(prev => ({ ...prev, color }))}
              />
            </div>

            <div className="space-y-2">
              <Label>아이콘</Label>
              <EmojiPicker
                emoji={formData.icon}
                onChange={(icon) => setFormData(prev => ({ ...prev, icon }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">정렬 순서</Label>
            <Input
              id="order"
              type="number"
              min="0"
              value={formData.order}
              onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isActive">활성 상태</Label>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <X className="w-4 h-4 mr-2" />
              초기화
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}