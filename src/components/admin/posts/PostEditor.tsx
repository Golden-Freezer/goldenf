'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/admin/editor/RichTextEditor';
import { SEOSettings } from '@/components/admin/posts/SEOSettings';
import { PostPreview } from '@/components/admin/posts/PostPreview';
import { TagInput } from '@/components/admin/posts/TagInput';
import { FileUploader } from '@/components/admin/files/FileUploader';
import { 
  Save, 
  Eye, 
  Send, 
  X, 
  Plus,
  Image,
  Paperclip,
  Settings
} from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';
import { generateSlug } from '@/lib/utils';

export function PostEditor() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState('DRAFT');
  const [showPreview, setShowPreview] = useState(false);
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [] as string[],
    ogImage: '',
  });

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug) {
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async (publishStatus: 'DRAFT' | 'PUBLISHED') => {
    const postData = {
      title,
      slug,
      content,
      excerpt,
      status: publishStatus,
      categoryId,
      tags,
      metaTitle: seoData.metaTitle || title,
      metaDescription: seoData.metaDescription || excerpt,
      metaKeywords: seoData.metaKeywords,
      ogImage: seoData.ogImage,
    };

    try {
      // Implement save logic here
      console.log('Saving post:', postData);
      
      // Show success message
      alert(publishStatus === 'DRAFT' ? '임시저장되었습니다.' : '게시글이 발행되었습니다.');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">게시글 미리보기</h2>
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(false)}
          >
            <X className="w-4 h-4 mr-2" />
            편집으로 돌아가기
          </Button>
        </div>
        <PostPreview
          title={title}
          content={content}
          excerpt={excerpt}
          category={BLOG_CATEGORIES.find(cat => cat.id === categoryId)?.name}
          tags={tags}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>게시글 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                placeholder="게시글 제목을 입력하세요"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="text-lg font-medium"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">URL 슬러그</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  /blog/
                </span>
                <Input
                  id="slug"
                  placeholder="url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">요약 (선택사항)</Label>
              <Textarea
                id="excerpt"
                placeholder="게시글 요약을 입력하세요. 검색 결과와 소셜 미디어에서 보여집니다."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
              />
              <div className="text-sm text-gray-500">
                {excerpt.length}/160자
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <Label>본문 내용 *</Label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="게시글 내용을 작성하세요..."
              />
            </div>
          </CardContent>
        </Card>

        {/* File Attachments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Paperclip className="w-5 h-5 mr-2" />
              첨부 파일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader
              onFileUpload={(files) => {
                console.log('Files uploaded:', files);
              }}
              accept={{
                'application/pdf': ['.pdf'],
                'application/msword': ['.doc'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'application/vnd.ms-excel': ['.xls'],
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
              }}
              maxSize={10 * 1024 * 1024} // 10MB
            />
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <SEOSettings
          data={seoData}
          onChange={setSeoData}
          title={title}
          excerpt={excerpt}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Publish Actions */}
        <Card>
          <CardHeader>
            <CardTitle>발행</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant={status === 'PUBLISHED' ? 'default' : 'secondary'}>
                {status === 'PUBLISHED' ? '게시됨' : '임시저장'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => setShowPreview(true)}
                variant="outline" 
                className="w-full"
              >
                <Eye className="w-4 h-4 mr-2" />
                미리보기
              </Button>
              <Button 
                onClick={() => handleSave('DRAFT')}
                variant="outline" 
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                임시저장
              </Button>
              <Button 
                onClick={() => handleSave('PUBLISHED')}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                게시하기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {BLOG_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>태그</CardTitle>
          </CardHeader>
          <CardContent>
            <TagInput
              tags={tags}
              onChange={setTags}
              placeholder="태그를 입력하고 Enter를 누르세요"
            />
          </CardContent>
        </Card>

        {/* Featured Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image className="w-5 h-5 mr-2" />
              대표 이미지
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FileUploader
              onFileUpload={(files) => {
                console.log('Featured image uploaded:', files);
              }}
              accept={{
                'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
              }}
              maxSize={5 * 1024 * 1024} // 5MB
              maxFiles={1}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}