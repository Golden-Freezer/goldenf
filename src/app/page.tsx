import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BLOG_CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { samplePosts } from "@/data/sample-posts";
import { formatDate, formatNumber } from "@/lib/utils";

export default function Home() {
  const featuredPosts = samplePosts.filter(post => post.featured).slice(0, 3);
  const recentPosts = samplePosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              총무 업무에 필요한 실무 가이드와 법무 정보를 제공하는 전문 블로그
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/blog">전체 글 보기</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">카테고리 탐색</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">추천 글</h2>
            <p className="text-muted-foreground">총무 업무에 꼭 필요한 핵심 가이드</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: post.category.color + '20', color: post.category.color }}>
                      {post.category.icon} {post.category.name}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime}분 읽기</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">카테고리</h2>
            <p className="text-muted-foreground">분야별 전문 콘텐츠를 확인하세요</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="font-semibold">{category.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatNumber(category.postCount)}개 글
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/categories/${category.slug}`}>
                      카테고리 보기
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">최신 글</h2>
            <p className="text-muted-foreground">가장 최근에 업데이트된 콘텐츠</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: post.category.color + '20', color: post.category.color }}>
                      {post.category.icon} {post.category.name}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>👁 {formatNumber(post.views)}</span>
                      <span>❤️ {post.likes}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime}분 읽기</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/blog">모든 글 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            총무 업무의 모든 것
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            실무진의 경험과 전문성을 바탕으로 한 실용적인 가이드와 최신 정보를 제공합니다
          </p>
          <Button size="lg" asChild>
            <Link href="/about">더 알아보기</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
