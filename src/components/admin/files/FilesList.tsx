'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { 
  File, 
  FileText, 
  Image, 
  Archive,
  Download, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data - replace with actual data from your API
const files = [
  {
    id: '1',
    filename: '총무업무매뉴얼_2024.pdf',
    originalName: '총무업무매뉴얼_2024.pdf',
    mimeType: 'application/pdf',
    size: 2457600, // 2.4MB
    category: 'DOCUMENT',
    description: '2024년 총무 업무 매뉴얼',
    isPublic: true,
    uploadedAt: '2024-01-15',
    uploader: '관리자',
  },
  {
    id: '2',
    filename: '인사관리시스템_설치파일.exe',
    originalName: '인사관리시스템_v2.1.exe',
    mimeType: 'application/x-msdownload',
    size: 15728640, // 15MB
    category: 'PROGRAM',
    description: '인사관리 시스템 설치 프로그램',
    isPublic: false,
    uploadedAt: '2024-01-12',
    uploader: '관리자',
  },
  {
    id: '3',
    filename: '사무용품목록_템플릿.xlsx',
    originalName: '사무용품목록_템플릿.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 524288, // 512KB
    category: 'SPREADSHEET',
    description: '사무용품 관리 엑셀 템플릿',
    isPublic: true,
    uploadedAt: '2024-01-10',
    uploader: '관리자',
  },
  {
    id: '4',
    filename: '회사조직도_2024.png',
    originalName: '회사조직도_2024.png',
    mimeType: 'image/png',
    size: 1048576, // 1MB
    category: 'IMAGE',
    description: '2024년 회사 조직도',
    isPublic: true,
    uploadedAt: '2024-01-08',
    uploader: '관리자',
  },
];

const getFileIcon = (mimeType: string, category: string) => {
  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.includes('pdf') || category === 'DOCUMENT') return FileText;
  if (mimeType.includes('zip') || mimeType.includes('archive')) return Archive;
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    DOCUMENT: '문서',
    PROGRAM: '프로그램',
    IMAGE: '이미지',
    SPREADSHEET: '스프레드시트',
    PRESENTATION: '프레젠테이션',
    ARCHIVE: '압축파일',
    OTHER: '기타',
  };
  return labels[category] || category;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    DOCUMENT: 'bg-blue-100 text-blue-800',
    PROGRAM: 'bg-purple-100 text-purple-800',
    IMAGE: 'bg-green-100 text-green-800',
    SPREADSHEET: 'bg-yellow-100 text-yellow-800',
    PRESENTATION: 'bg-orange-100 text-orange-800',
    ARCHIVE: 'bg-gray-100 text-gray-800',
    OTHER: 'bg-gray-100 text-gray-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export function FilesList() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleDownload = (file: any) => {
    // Implement download functionality
    console.log('Download file:', file.id);
  };

  const handleDelete = (fileId: string) => {
    if (confirm('이 파일을 삭제하시겠습니까?')) {
      console.log('Delete file:', fileId);
    }
  };

  const handleToggleSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>파일 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(files.map(f => f.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>파일명</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>크기</TableHead>
                <TableHead>공개 여부</TableHead>
                <TableHead>업로드일</TableHead>
                <TableHead>업로더</TableHead>
                <TableHead className="w-20">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => {
                const FileIcon = getFileIcon(file.mimeType, file.category);
                
                return (
                  <TableRow key={file.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleToggleSelect(file.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <FileIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {file.filename}
                          </div>
                          {file.description && (
                            <div className="text-sm text-gray-500">
                              {file.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(file.category)}>
                        {getCategoryLabel(file.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatFileSize(file.size)}</TableCell>
                    <TableCell>
                      <Badge variant={file.isPublic ? 'default' : 'secondary'}>
                        {file.isPublic ? '공개' : '비공개'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                    <TableCell>{file.uploader}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleDownload(file)}>
                            <Download className="w-4 h-4 mr-2" />
                            다운로드
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            미리보기
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            편집
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(file.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">
              {selectedFiles.length}개 파일이 선택됨
            </span>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                일괄 다운로드
              </Button>
              <Button variant="destructive" size="sm">
                일괄 삭제
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}