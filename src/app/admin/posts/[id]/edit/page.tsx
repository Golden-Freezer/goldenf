import { EditPostClient } from '@/components/admin/posts/EditPostClient';

// Generate static params for admin post routes - return empty for security
export async function generateStaticParams() {
  // Admin routes should not be pre-generated for security reasons
  return [];
}

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: { id: string };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return <EditPostClient postId={params.id} />;
}