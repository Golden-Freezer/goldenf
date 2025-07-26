'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder component - this will be expanded with actual functionality
export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>대시보드 개요</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            관리자 대시보드에 오신 것을 환영합니다. 여기서 블로그 운영에 필요한 모든 기능을 관리할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}