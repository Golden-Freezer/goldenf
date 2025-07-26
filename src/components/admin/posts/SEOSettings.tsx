'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/admin/posts/TagInput';
import { Search, Globe, Share2 } from 'lucide-react';

interface SEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
}

interface SEOSettingsProps {
  data: SEOData;
  onChange: (data: SEOData) => void;
  title: string;
  excerpt: string;
}

export function SEOSettings({ data, onChange, title, excerpt }: SEOSettingsProps) {
  const handleChange = (field: keyof SEOData, value: string | string[]) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const metaTitleLength = data.metaTitle.length;
  const metaDescriptionLength = data.metaDescription.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2" />
          SEO 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meta Title */}
        <div className="space-y-2">
          <Label htmlFor="metaTitle">SEO 제목</Label>
          <Input
            id="metaTitle"
            placeholder={title || 'SEO 제목을 입력하세요 (기본값: 게시글 제목)'}
            value={data.metaTitle}
            onChange={(e) => handleChange('metaTitle', e.target.value)}
          />
          <div className="flex justify-between text-xs">
            <span className={metaTitleLength > 60 ? 'text-red-500' : 'text-gray-500'}>
              {metaTitleLength}/60자 (권장)
            </span>
            <span className="text-gray-400">Google 검색 결과에 표시</span>
          </div>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <Label htmlFor="metaDescription">SEO 설명</Label>
          <Textarea
            id="metaDescription"
            placeholder={excerpt || 'SEO 설명을 입력하세요 (기본값: 게시글 요약)'}
            value={data.metaDescription}
            onChange={(e) => handleChange('metaDescription', e.target.value)}
            rows={3}
          />
          <div className="flex justify-between text-xs">
            <span className={metaDescriptionLength > 160 ? 'text-red-500' : 'text-gray-500'}>
              {metaDescriptionLength}/160자 (권장)
            </span>
            <span className="text-gray-400">검색 결과 요약에 표시</span>
          </div>
        </div>

        {/* Meta Keywords */}
        <div className="space-y-2">
          <Label>SEO 키워드</Label>
          <TagInput
            tags={data.metaKeywords}
            onChange={(keywords) => handleChange('metaKeywords', keywords)}
            placeholder="키워드를 입력하고 Enter를 누르세요"
          />
          <div className="text-xs text-gray-500">
            총무, 업무관리, 인사관리 등 관련 키워드를 추가하세요
          </div>
        </div>

        {/* Open Graph Image */}
        <div className="space-y-2">
          <Label htmlFor="ogImage">소셜 미디어 이미지 URL</Label>
          <Input
            id="ogImage"
            placeholder="https://example.com/image.jpg"
            value={data.ogImage}
            onChange={(e) => handleChange('ogImage', e.target.value)}
          />
          <div className="text-xs text-gray-500">
            소셜 미디어에서 공유될 때 표시되는 이미지 (1200x630px 권장)
          </div>
        </div>

        {/* SEO Preview */}
        <div className="space-y-3">
          <Label className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Google 검색 결과 미리보기
          </Label>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {data.metaTitle || title || '게시글 제목'}
            </div>
            <div className="text-green-700 text-sm">
              goldenf.pages.dev/blog/example-slug
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {data.metaDescription || excerpt || '게시글 설명이 여기에 표시됩니다...'}
            </div>
          </div>
        </div>

        {/* Social Media Preview */}
        {data.ogImage && (
          <div className="space-y-3">
            <Label className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              소셜 미디어 미리보기
            </Label>
            <div className="border rounded-lg overflow-hidden bg-white">
              <img
                src={data.ogImage}
                alt="Social media preview"
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <div className="font-medium text-sm">
                  {data.metaTitle || title || '게시글 제목'}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {data.metaDescription || excerpt || '게시글 설명...'}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  goldenf.pages.dev
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}