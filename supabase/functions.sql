-- Function to increment post view count
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE posts 
    SET "viewCount" = "viewCount" + 1 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment count when comments are added/removed
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts 
        SET "commentCount" = "commentCount" + 1 
        WHERE id = NEW."postId";
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts 
        SET "commentCount" = "commentCount" - 1 
        WHERE id = OLD."postId";
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update comment count
CREATE TRIGGER trigger_update_comment_count
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comment_count();

-- Function to get popular posts
CREATE OR REPLACE FUNCTION get_popular_posts(
    days_back INTEGER DEFAULT 30,
    post_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    slug TEXT,
    "viewCount" INTEGER,
    "publishedAt" TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p."viewCount",
        p."publishedAt"
    FROM posts p
    WHERE 
        p.status = 'PUBLISHED'
        AND p."publishedAt" >= NOW() - INTERVAL '1 day' * days_back
    ORDER BY p."viewCount" DESC, p."publishedAt" DESC
    LIMIT post_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get related posts by category and tags
CREATE OR REPLACE FUNCTION get_related_posts(
    current_post_id TEXT,
    post_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    "publishedAt" TIMESTAMPTZ
) AS $$
DECLARE
    current_category_id TEXT;
BEGIN
    -- Get the category of the current post
    SELECT "categoryId" INTO current_category_id
    FROM posts 
    WHERE id = current_post_id;
    
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p."publishedAt"
    FROM posts p
    WHERE 
        p.status = 'PUBLISHED'
        AND p.id != current_post_id
        AND (
            p."categoryId" = current_category_id
            OR p.id IN (
                SELECT DISTINCT pt1."postId"
                FROM post_tags pt1
                WHERE pt1."tagId" IN (
                    SELECT pt2."tagId"
                    FROM post_tags pt2
                    WHERE pt2."postId" = current_post_id
                )
            )
        )
    ORDER BY 
        CASE WHEN p."categoryId" = current_category_id THEN 1 ELSE 2 END,
        p."publishedAt" DESC
    LIMIT post_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to get post archive by month
CREATE OR REPLACE FUNCTION get_post_archive()
RETURNS TABLE (
    year INTEGER,
    month INTEGER,
    post_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        EXTRACT(YEAR FROM "publishedAt")::INTEGER as year,
        EXTRACT(MONTH FROM "publishedAt")::INTEGER as month,
        COUNT(*) as post_count
    FROM posts
    WHERE status = 'PUBLISHED'
        AND "publishedAt" IS NOT NULL
    GROUP BY 
        EXTRACT(YEAR FROM "publishedAt"),
        EXTRACT(MONTH FROM "publishedAt")
    ORDER BY year DESC, month DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to search posts with ranking
CREATE OR REPLACE FUNCTION search_posts_ranked(
    search_query TEXT,
    post_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    id TEXT,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        (
            ts_rank(
                to_tsvector('korean', p.title || ' ' || COALESCE(p.content, '') || ' ' || COALESCE(p.excerpt, '')),
                plainto_tsquery('korean', search_query)
            ) * 
            CASE 
                WHEN p.title ILIKE '%' || search_query || '%' THEN 2.0
                ELSE 1.0
            END
        ) as rank
    FROM posts p
    WHERE 
        p.status = 'PUBLISHED'
        AND (
            to_tsvector('korean', p.title || ' ' || COALESCE(p.content, '') || ' ' || COALESCE(p.excerpt, '')) 
            @@ plainto_tsquery('korean', search_query)
            OR p.title ILIKE '%' || search_query || '%'
            OR p.content ILIKE '%' || search_query || '%'
        )
    ORDER BY rank DESC, p."publishedAt" DESC
    LIMIT post_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to log visitor activity
CREATE OR REPLACE FUNCTION log_visitor(
    ip_addr TEXT,
    user_agent_str TEXT DEFAULT NULL,
    referer_str TEXT DEFAULT NULL,
    page_path TEXT DEFAULT '/'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO visitor_logs ("ipAddress", "userAgent", referer, path)
    VALUES (ip_addr, user_agent_str, referer_str, page_path);
END;
$$ LANGUAGE plpgsql;

-- Function to get visitor statistics
CREATE OR REPLACE FUNCTION get_visitor_stats(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    total_visits BIGINT,
    unique_visitors BIGINT,
    top_pages JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM visitor_logs 
         WHERE timestamp >= NOW() - INTERVAL '1 day' * days_back) as total_visits,
        (SELECT COUNT(DISTINCT "ipAddress") FROM visitor_logs 
         WHERE timestamp >= NOW() - INTERVAL '1 day' * days_back) as unique_visitors,
        (SELECT json_agg(row_to_json(t)) FROM (
            SELECT path, COUNT(*) as visits
            FROM visitor_logs 
            WHERE timestamp >= NOW() - INTERVAL '1 day' * days_back
            GROUP BY path
            ORDER BY visits DESC
            LIMIT 10
        ) t) as top_pages;
END;
$$ LANGUAGE plpgsql;