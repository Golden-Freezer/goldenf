'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { Calendar, Clock, User, Tag } from 'lucide-react';

interface PostPreviewProps {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
}

export function PostPreview({ 
  title, 
  content, 
  excerpt, 
  category, 
  tags = [], 
  author = '관리자',
  publishedAt = new Date().toISOString()
}: PostPreviewProps) {
  const readingTime = calculateReadingTime(content);
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category */}
            {category && (
              <div className="mb-4">
                <Badge variant="secondary" className="text-sm">
                  {category}
                </Badge>
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {title || '제목을 입력하세요'}
            </h1>
            
            {/* Excerpt */}
            {excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {excerpt}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                약 {readingTime}분 읽기
              </div>
            </div>
          </header>
          
          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              className="leading-relaxed"
              style={{
                fontFamily: 'Pretendard, system-ui, sans-serif',
                lineHeight: '1.8',
              }}
            />
            
            {!content && (
              <div className="text-gray-400 text-center py-12">
                게시글 내용을 작성하면 여기에 미리보기가 표시됩니다.
              </div>
            )}
          </article>
          
          {/* Tags */}
          {tags.length > 0 && (
            <footer className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="w-4 h-4 text-gray-500 mr-2" />
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </footer>
          )}
        </CardContent>
      </Card>
      
      {/* Custom Styles for Korean Typography */}
      <style jsx global>{`
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          font-family: 'Pretendard', system-ui, sans-serif;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2em;
          margin-bottom: 1em;
          line-height: 1.4;
        }
        
        .prose h1 {
          font-size: 2em;
          margin-top: 0;
        }
        
        .prose h2 {
          font-size: 1.5em;
          padding-bottom: 0.3em;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .prose h3 {
          font-size: 1.25em;
        }
        
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
          line-height: 1.75;
        }
        
        .prose blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: #6b7280;
          background: #f9fafb;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        
        .prose ul, .prose ol {
          margin: 1.25em 0;
          padding-left: 1.5em;
        }
        
        .prose li {
          margin: 0.5em 0;
        }
        
        .prose pre {
          background: #f3f4f6;
          border-radius: 0.5rem;
          padding: 1em;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        
        .prose code {
          background: #f3f4f6;
          padding: 0.125em 0.25em;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        
        .prose img {
          border-radius: 0.5rem;
          margin: 2em auto;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .prose a {
          color: #0ea5e9;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        
        .prose a:hover {
          border-bottom-color: #0ea5e9;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        
        .prose th, .prose td {
          border: 1px solid #e5e7eb;
          padding: 0.75em;
          text-align: left;
        }
        
        .prose th {
          background: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}