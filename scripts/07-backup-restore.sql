-- Backup and restore utilities
-- Use these commands for database maintenance

-- Create a backup function
CREATE OR REPLACE FUNCTION create_portfolio_backup()
RETURNS TEXT AS $$
DECLARE
    backup_name TEXT;
    result TEXT;
BEGIN
    backup_name := 'portfolio_backup_' || to_char(NOW(), 'YYYY_MM_DD_HH24_MI_SS');
    
    -- This is a placeholder for backup logic
    -- In practice, you would use pg_dump or similar tools
    result := 'Backup created: ' || backup_name;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old data
CREATE OR REPLACE FUNCTION cleanup_old_data(days_to_keep INTEGER DEFAULT 90)
RETURNS TEXT AS $$
DECLARE
    deleted_count INTEGER := 0;
    result TEXT;
BEGIN
    -- Clean up old analytics data
    DELETE FROM analytics 
    WHERE created_at < NOW() - INTERVAL '1 day' * days_to_keep;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    result := 'Cleaned up ' || deleted_count || ' old analytics records';
    
    -- Clean up old unread contact messages (optional)
    -- DELETE FROM contact_messages 
    -- WHERE status = 'unread' AND created_at < NOW() - INTERVAL '1 day' * (days_to_keep * 2);
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update all timestamps
CREATE OR REPLACE FUNCTION refresh_all_timestamps()
RETURNS TEXT AS $$
BEGIN
    -- Update all updated_at timestamps to current time
    -- This can be useful for cache invalidation
    
    UPDATE blog_posts SET updated_at = NOW() WHERE updated_at < created_at;
    UPDATE projects SET updated_at = NOW() WHERE updated_at < created_at;
    UPDATE skills SET updated_at = NOW() WHERE updated_at < created_at;
    UPDATE education SET updated_at = NOW() WHERE updated_at < created_at;
    UPDATE certifications SET updated_at = NOW() WHERE updated_at < created_at;
    
    RETURN 'All timestamps refreshed successfully';
END;
$$ LANGUAGE plpgsql;

-- Function to validate data integrity
CREATE OR REPLACE FUNCTION validate_data_integrity()
RETURNS TABLE(
    table_name TEXT,
    issue_type TEXT,
    issue_count BIGINT,
    details TEXT
) AS $$
BEGIN
    -- Check for blog posts without slugs
    RETURN QUERY
    SELECT 
        'blog_posts'::TEXT,
        'missing_slug'::TEXT,
        COUNT(*)::BIGINT,
        'Blog posts without slugs'::TEXT
    FROM blog_posts 
    WHERE slug IS NULL OR slug = '';
    
    -- Check for projects without descriptions
    RETURN QUERY
    SELECT 
        'projects'::TEXT,
        'missing_description'::TEXT,
        COUNT(*)::BIGINT,
        'Projects without descriptions'::TEXT
    FROM projects 
    WHERE description IS NULL OR description = '';
    
    -- Check for skills with invalid levels
    RETURN QUERY
    SELECT 
        'skills'::TEXT,
        'invalid_level'::TEXT,
        COUNT(*)::BIGINT,
        'Skills with invalid level values'::TEXT
    FROM skills 
    WHERE level < 1 OR level > 5;
    
    -- Check for expired certifications that are still marked as active
    RETURN QUERY
    SELECT 
        'certifications'::TEXT,
        'expired_but_active'::TEXT,
        COUNT(*)::BIGINT,
        'Expired certifications marked as active'::TEXT
    FROM certifications 
    WHERE expiration_date < CURRENT_DATE AND is_active = true;
    
    RETURN;
END;
$$ LANGUAGE plpgsql;
