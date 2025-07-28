import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentPosts } from '@/components/admin/RecentPosts';
import { QuickActions } from '@/components/admin/QuickActions';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
        <div className="text-sm text-gray-500">
          골든에프 총무블로그 관리
        </div>
      </div>

      <AdminStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentPosts />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}