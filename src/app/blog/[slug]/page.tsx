import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types';
import { formatDate, generateArticleStructuredData } from '@/lib/utils';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog-utils';
import { SITE_CONFIG } from '@/lib/constants';
import { AdSenseAd } from '@/components/ads/adsense-ad';

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '게시물을 찾을 수 없습니다',
      description: '요청하신 게시물을 찾을 수 없습니다.',
    };
  }

  const url = `${SITE_CONFIG.url}/blog/${post.slug}`;

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: SITE_CONFIG.author.name,
    openGraph: {
      type: 'article',
      locale: 'ko_KR',
      url,
      title: post.title,
      description: post.seo.description,
      siteName: SITE_CONFIG.name,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seo.description,
      creator: SITE_CONFIG.author.twitter,
      images: [SITE_CONFIG.ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const structuredData = generateArticleStructuredData({
    title: post.title,
    description: post.seo.description,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
  });

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <article>
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-700">홈</Link>
              {' > '}
              <Link href="/blog" className="hover:text-gray-700">블로그</Link>
              {' > '}
              <Link href={`/categories/${post.category.slug}`} className="hover:text-gray-700">
                {post.category.name}
              </Link>
              {' > '}
              <span className="text-gray-900">{post.title}</span>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge 
                  variant="secondary" 
                  style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
                >
                  {post.category.name}
                </Badge>
                {post.featured && (
                  <Badge variant="outline" className="text-amber-600 border-amber-600">
                    추천글
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-6">
                <div className="flex items-center">
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <div className="flex items-center">
                  <span>{post.readingTime}분 읽기</span>
                </div>
                <div className="flex items-center">
                  <span>조회 {post.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <span>❤️ {post.likes}</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Ad - Top of Article */}
            <div className="mb-8">
              <AdSenseAd
                adSlot="TOP_ARTICLE"
                format="horizontal"
                className="mb-8"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>

            {/* Ad - Middle of Article */}
            <div className="my-8">
              <AdSenseAd
                adSlot="MIDDLE_ARTICLE"
                format="horizontal"
                className="my-8"
              />
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-gray-600">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 글</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge 
                          variant="secondary" 
                          style={{ 
                            backgroundColor: `${relatedPost.category.color}20`, 
                            color: relatedPost.category.color 
                          }}
                        >
                          {relatedPost.category.name}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500 space-x-3">
                        <span>{formatDate(relatedPost.publishedAt, 'short')}</span>
                        <span>{relatedPost.readingTime}분</span>
                        <span>👁️ {relatedPost.views.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Ad - Bottom of Article */}
          <div className="mt-12">
            <AdSenseAd
              adSlot="BOTTOM_ARTICLE"
              format="horizontal"
              className="mt-12"
            />
          </div>

          {/* Call to Action */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              더 많은 총무 업무 정보가 필요하시나요?
            </h3>
            <p className="text-gray-600 mb-4">
              골든에프 블로그에서 총무 업무에 필요한 실무 가이드와 최신 정보를 확인하세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                전체 글 보기
              </Link>
              <Link
                href={`/categories/${post.category.slug}`}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
              >
                {post.category.name} 글 더보기
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}