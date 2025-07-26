-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enums
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SPAM');
CREATE TYPE "FileCategory" AS ENUM ('DOCUMENT', 'PROGRAM', 'IMAGE', 'SPREADSHEET', 'PRESENTATION', 'ARCHIVE', 'OTHER');

-- NextAuth.js required tables
CREATE TABLE accounts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "userId" TEXT NOT NULL,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, "providerAccountId")
);

CREATE TABLE sessions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    expires TIMESTAMPTZ NOT NULL
);

CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    password TEXT, -- 관리자 직접 로그인용
    role "UserRole" DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    UNIQUE(identifier, token)
);

-- 카테고리 (총무 업무 관련)
CREATE TABLE categories (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL, -- 예: "회계관리", "인사관리", "문서관리"
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT, -- 카테고리 색상 (hex)
    "order" INTEGER DEFAULT 0, -- 정렬 순서
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 태그
CREATE TABLE tags (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    color TEXT, -- 태그 색상
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 블로그 포스트
CREATE TABLE posts (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL, -- 한글 제목 지원
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL, -- 긴 한글 콘텐츠 지원
    excerpt TEXT, -- 요약
    status "PostStatus" DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMPTZ,
    
    -- SEO 메타데이터
    "metaTitle" TEXT, -- SEO 제목
    "metaDescription" TEXT, -- SEO 설명 (한글)
    "metaKeywords" TEXT[] DEFAULT '{}', -- SEO 키워드 배열
    "ogImage" TEXT, -- Open Graph 이미지
    
    -- 관계
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT,
    
    -- 통계
    "viewCount" INTEGER DEFAULT 0,
    "commentCount" INTEGER DEFAULT 0,

    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    FOREIGN KEY ("authorId") REFERENCES users(id),
    FOREIGN KEY ("categoryId") REFERENCES categories(id)
);

-- 포스트-태그 중간 테이블
CREATE TABLE post_tags (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    PRIMARY KEY ("postId", "tagId"),
    FOREIGN KEY ("postId") REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY ("tagId") REFERENCES tags(id) ON DELETE CASCADE
);

-- 댓글 시스템
CREATE TABLE comments (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL, -- 한글 댓글 지원
    status "CommentStatus" DEFAULT 'PENDING',
    
    -- 관계
    "postId" TEXT NOT NULL,
    "authorId" TEXT,
    
    -- 대댓글 지원
    "parentId" TEXT,
    
    -- 익명 댓글 지원
    "guestName" TEXT, -- 비회원 이름
    "guestEmail" TEXT, -- 비회원 이메일
    "ipAddress" TEXT, -- IP 주소

    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    FOREIGN KEY ("postId") REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES users(id),
    FOREIGN KEY ("parentId") REFERENCES comments(id)
);

-- 파일 업로드 (문서/프로그램)
CREATE TABLE file_uploads (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL, -- 원본 파일명 (한글 지원)
    "originalName" TEXT NOT NULL, -- 업로드시 원본명
    "mimeType" TEXT NOT NULL, -- MIME 타입
    size BIGINT NOT NULL, -- 파일 크기 (bytes)
    path TEXT NOT NULL, -- 파일 경로
    url TEXT, -- 접근 URL
    category "FileCategory" DEFAULT 'DOCUMENT',
    
    -- 메타데이터
    description TEXT, -- 파일 설명 (한글)
    version TEXT, -- 버전 정보
    "isPublic" BOOLEAN DEFAULT false, -- 공개 여부
    
    -- 관계
    "uploaderId" TEXT NOT NULL,

    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    
    FOREIGN KEY ("uploaderId") REFERENCES users(id)
);

-- 포스트-파일 연결
CREATE TABLE post_uploads (
    "postId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    PRIMARY KEY ("postId", "fileId"),
    FOREIGN KEY ("postId") REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY ("fileId") REFERENCES file_uploads(id) ON DELETE CASCADE
);

-- 사이트 설정
CREATE TABLE site_settings (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL, -- 설정 키
    value TEXT NOT NULL, -- 설정 값 (JSON 등 가능)
    type TEXT DEFAULT 'string', -- 값 타입
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 방문자 통계 (선택사항)
CREATE TABLE visitor_logs (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    referer TEXT,
    path TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts("publishedAt");
CREATE INDEX idx_posts_author_id ON posts("authorId");
CREATE INDEX idx_posts_category_id ON posts("categoryId");
CREATE INDEX idx_posts_title_gin ON posts USING gin(title gin_trgm_ops);
CREATE INDEX idx_posts_content_gin ON posts USING gin(content gin_trgm_ops);

CREATE INDEX idx_comments_post_id ON comments("postId");
CREATE INDEX idx_comments_status ON comments(status);
CREATE INDEX idx_comments_created_at ON comments("createdAt");

CREATE INDEX idx_file_uploads_uploader_id ON file_uploads("uploaderId");
CREATE INDEX idx_file_uploads_category ON file_uploads(category);

CREATE INDEX idx_visitor_logs_timestamp ON visitor_logs(timestamp);
CREATE INDEX idx_visitor_logs_path ON visitor_logs(path);

-- Create foreign key relationships
ALTER TABLE accounts ADD FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE sessions ADD FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_file_uploads_updated_at BEFORE UPDATE ON file_uploads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id);

-- RLS Policies for posts table
CREATE POLICY "Published posts are viewable by everyone" ON posts
    FOR SELECT USING (status = 'PUBLISHED');

CREATE POLICY "Authors can view their own posts" ON posts
    FOR SELECT USING (auth.uid()::text = "authorId");

CREATE POLICY "Authors can create posts" ON posts
    FOR INSERT WITH CHECK (auth.uid()::text = "authorId");

CREATE POLICY "Authors can update their own posts" ON posts
    FOR UPDATE USING (auth.uid()::text = "authorId");

CREATE POLICY "Admins can manage all posts" ON posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- RLS Policies for comments table
CREATE POLICY "Comments are viewable by everyone" ON comments
    FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON comments
    FOR INSERT WITH CHECK (
        auth.uid()::text = "authorId" OR "authorId" IS NULL
    );

CREATE POLICY "Authors can update their own comments" ON comments
    FOR UPDATE USING (auth.uid()::text = "authorId");

CREATE POLICY "Admins can manage all comments" ON comments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid()::text 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- RLS Policies for file_uploads table
CREATE POLICY "Public files are viewable by everyone" ON file_uploads
    FOR SELECT USING ("isPublic" = true);

CREATE POLICY "Uploaders can view their own files" ON file_uploads
    FOR SELECT USING (auth.uid()::text = "uploaderId");

CREATE POLICY "Users can upload files" ON file_uploads
    FOR INSERT WITH CHECK (auth.uid()::text = "uploaderId");

CREATE POLICY "Uploaders can update their own files" ON file_uploads
    FOR UPDATE USING (auth.uid()::text = "uploaderId");

-- Insert default categories for 총무 업무
INSERT INTO categories (name, slug, description, color, "order") VALUES
('회계관리', 'accounting', '예산, 결산, 세무 관련 업무', '#3B82F6', 1),
('인사관리', 'hr', '채용, 급여, 인사평가 관련 업무', '#10B981', 2),
('문서관리', 'document', '공문, 계약서, 각종 서류 관리', '#F59E0B', 3),
('시설관리', 'facility', '사무실, 장비, 시설 관리', '#8B5CF6', 4),
('구매관리', 'procurement', '물품 구매, 계약, 자산 관리', '#EF4444', 5),
('법무관리', 'legal', '계약검토, 법적 이슈, 컴플라이언스', '#6B7280', 6);

-- Insert default tags
INSERT INTO tags (name, slug, color) VALUES
('엑셀', 'excel', '#22C55E'),
('양식', 'form', '#3B82F6'),
('매뉴얼', 'manual', '#F59E0B'),
('체크리스트', 'checklist', '#EF4444'),
('템플릿', 'template', '#8B5CF6'),
('업무가이드', 'guide', '#06B6D4'),
('법령', 'regulation', '#6B7280'),
('프로그램', 'program', '#F97316');

-- Insert default site settings
INSERT INTO site_settings (key, value, type) VALUES
('site_title', 'Golden-Freezer''s 총무업무 블로그', 'string'),
('site_description', '총무업무에 필요한 모든 정보와 자료를 제공하는 전문 블로그', 'string'),
('posts_per_page', '10', 'number'),
('comments_enabled', 'true', 'boolean'),
('guest_comments_enabled', 'true', 'boolean'),
('file_upload_max_size', '10485760', 'number'),
('allowed_file_types', '["pdf","doc","docx","xls","xlsx","ppt","pptx","hwp","zip","rar"]', 'json');

-- Create storage buckets (these need to be created manually in Supabase Dashboard)
-- Documents bucket for file uploads
-- Images bucket for post images and thumbnails