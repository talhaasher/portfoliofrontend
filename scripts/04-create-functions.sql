-- Create useful database functions
-- Run this script to add helper functions

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_experience_updated_at BEFORE UPDATE ON work_experience 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate blog post slug
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
                '\s+', '-', 'g'
            ),
            '^-+|-+$', '', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;

-- Function to get portfolio statistics
CREATE OR REPLACE FUNCTION get_portfolio_stats()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_blog_posts', (SELECT COUNT(*) FROM blog_posts WHERE published = true),
        'total_projects', (SELECT COUNT(*) FROM projects),
        'total_skills', (SELECT COUNT(*) FROM skills),
        'featured_projects', (SELECT COUNT(*) FROM projects WHERE is_featured = true),
        'featured_skills', (SELECT COUNT(*) FROM skills WHERE is_featured = true),
        'active_certifications', (SELECT COUNT(*) FROM certifications WHERE is_active = true),
        'total_experience_years', (
            SELECT COALESCE(MAX(years_experience), 0) FROM skills
        ),
        'latest_blog_post', (
            SELECT json_build_object(
                'title', title,
                'created_at', created_at,
                'slug', slug
            ) FROM blog_posts 
            WHERE published = true 
            ORDER BY created_at DESC 
            LIMIT 1
        ),
        'skill_categories', (
            SELECT json_agg(DISTINCT category) FROM skills
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to search blog posts
CREATE OR REPLACE FUNCTION search_blog_posts(search_term TEXT)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    slug VARCHAR,
    excerpt TEXT,
    category VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.category,
        bp.created_at,
        ts_rank(
            to_tsvector('english', bp.title || ' ' || COALESCE(bp.excerpt, '') || ' ' || COALESCE(bp.content, '')),
            plainto_tsquery('english', search_term)
        ) as rank
    FROM blog_posts bp
    WHERE 
        bp.published = true
        AND (
            to_tsvector('english', bp.title || ' ' || COALESCE(bp.excerpt, '') || ' ' || COALESCE(bp.content, ''))
            @@ plainto_tsquery('english', search_term)
        )
    ORDER BY rank DESC, bp.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get related blog posts
CREATE OR REPLACE FUNCTION get_related_posts(post_slug VARCHAR, limit_count INTEGER DEFAULT 3)
RETURNS TABLE(
    id UUID,
    title VARCHAR,
    slug VARCHAR,
    excerpt TEXT,
    category VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
    post_category VARCHAR;
BEGIN
    -- Get the category of the current post
    SELECT category INTO post_category 
    FROM blog_posts 
    WHERE slug = post_slug AND published = true;
    
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.category,
        bp.created_at
    FROM blog_posts bp
    WHERE 
        bp.published = true
        AND bp.slug != post_slug
        AND (
            bp.category = post_category
            OR bp.tags && (SELECT tags FROM blog_posts WHERE slug = post_slug)
        )
    ORDER BY 
        CASE WHEN bp.category = post_category THEN 1 ELSE 2 END,
        bp.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
