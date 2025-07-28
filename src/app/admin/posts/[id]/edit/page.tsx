import { EditPostClient } from '@/components/admin/posts/EditPostClient';

// Generate static params for admin post routes - placeholder for static export
export async function generateStaticParams() {
  // Static export 호환성을 위해 빈 객체 반환
  return [{ id: 'placeholder' }];
}

// Static export를 위해 dynamic 설정 제거
// export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: { id: string };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return <EditPostClient postId={params.id} />;
}