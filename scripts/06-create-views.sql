-- Create useful database views
-- Run this script to create views for common queries

-- View for published blog posts with stats
CREATE OR REPLACE VIEW published_blog_posts AS
SELECT 
    bp.*,
    COALESCE(comment_stats.comment_count, 0) as comment_count,
    COALESCE(comment_stats.approved_comments, 0) as approved_comment_count
FROM blog_posts bp
LEFT JOIN (
    SELECT 
        blog_post_id,
        COUNT(*) as comment_count,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_comments
    FROM comments
    GROUP BY blog_post_id
) comment_stats ON bp.id = comment_stats.blog_post_id
WHERE bp.published = true;

-- View for featured content
CREATE OR REPLACE VIEW featured_content AS
SELECT 
    'blog_post' as content_type,
    id,
    title,
    slug as identifier,
    excerpt as description,
    created_at,
    updated_at
FROM blog_posts 
WHERE published = true AND featured = true

UNION ALL

SELECT 
    'project' as content_type,
    id,
    title,
    title as identifier,
    description,
    created_at,
    updated_at
FROM projects 
WHERE is_featured = true

UNION ALL

SELECT 
    'skill' as content_type,
    id,
    name as title,
    category as identifier,
    description,
    created_at,
    updated_at
FROM skills 
WHERE is_featured = true

UNION ALL

SELECT 
    'certification' as content_type,
    id,
    name as title,
    credential_id as identifier,
    description,
    created_at,
    updated_at
FROM certifications 
WHERE is_featured = true;

-- View for portfolio summary
CREATE OR REPLACE VIEW portfolio_summary AS
SELECT 
    (SELECT COUNT(*) FROM blog_posts WHERE published = true) as total_blog_posts,
    (SELECT COUNT(*) FROM projects) as total_projects,
    (SELECT COUNT(*) FROM skills) as total_skills,
    (SELECT COUNT(*) FROM certifications WHERE is_active = true) as active_certifications,
    (SELECT COUNT(*) FROM education) as education_entries,
    (SELECT COUNT(*) FROM work_experience) as work_experiences,
    (SELECT COUNT(*) FROM testimonials WHERE is_approved = true) as approved_testimonials,
    (SELECT MAX(years_experience) FROM skills) as max_experience_years,
    (SELECT COUNT(DISTINCT category) FROM skills) as skill_categories,
    (SELECT COUNT(*) FROM contact_messages WHERE status = 'unread') as unread_messages;

-- View for recent activity
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
    'blog_post' as activity_type,
    title as activity_title,
    created_at as activity_date,
    'published' as activity_status
FROM blog_posts 
WHERE published = true

UNION ALL

SELECT 
    'project' as activity_type,
    title as activity_title,
    created_at as activity_date,
    status as activity_status
FROM projects

UNION ALL

SELECT 
    'certification' as activity_type,
    name as activity_title,
    issue_date as activity_date,
    CASE WHEN is_active THEN 'active' ELSE 'expired' END as activity_status
FROM certifications

ORDER BY activity_date DESC
LIMIT 20;

-- View for skill statistics
CREATE OR REPLACE VIEW skill_statistics AS
SELECT 
    category,
    COUNT(*) as skill_count,
    AVG(level) as average_level,
    AVG(years_experience) as average_experience,
    COUNT(CASE WHEN is_featured THEN 1 END) as featured_count,
    MAX(level) as max_level,
    MIN(level) as min_level
FROM skills
GROUP BY category
ORDER BY skill_count DESC;

-- View for blog post analytics
CREATE OR REPLACE VIEW blog_analytics AS
SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.category,
    bp.created_at,
    COALESCE(analytics_data.view_count, 0) as view_count,
    COALESCE(comment_data.comment_count, 0) as comment_count,
    COALESCE(comment_data.approved_comments, 0) as approved_comments
FROM blog_posts bp
LEFT JOIN (
    SELECT 
        SUBSTRING(page_path FROM '/blog/(.+)') as slug,
        COUNT(*) as view_count
    FROM analytics 
    WHERE page_path LIKE '/blog/%' AND page_path != '/blog'
    GROUP BY SUBSTRING(page_path FROM '/blog/(.+)')
) analytics_data ON bp.slug = analytics_data.slug
LEFT JOIN (
    SELECT 
        blog_post_id,
        COUNT(*) as comment_count,
        COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_comments
    FROM comments
    GROUP BY blog_post_id
) comment_data ON bp.id = comment_data.blog_post_id
WHERE bp.published = true;
