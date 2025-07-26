import { FilesList } from '@/components/admin/files/FilesList';
import { FilesFilters } from '@/components/admin/files/FilesFilters';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">파일 관리</h1>
          <p className="text-gray-600 mt-1">문서 및 프로그램 파일을 관리합니다</p>
        </div>
        <Button asChild>
          <Link href="/admin/files/upload">
            <Upload className="w-4 h-4 mr-2" />
            파일 업로드
          </Link>
        </Button>
      </div>

      <FilesFilters />
      
      <FilesList />
    </div>
  );
}