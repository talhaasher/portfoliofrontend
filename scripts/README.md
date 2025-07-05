# Portfolio Database Scripts

This folder contains SQL scripts to set up and manage your portfolio database in Supabase.

## Script Execution Order

Run these scripts in the following order:

### 1. Core Setup
\`\`\`bash
# 1. Create all main tables
01-create-main-tables.sql

# 2. Add indexes for performance
02-create-indexes.sql

# 3. Enable Row Level Security
03-enable-rls.sql

# 4. Create helper functions and triggers
04-create-functions.sql
\`\`\`

### 2. Data Population
\`\`\`bash
# 5. Insert sample data
05-seed-sample-data.sql

# 6. Create useful views
06-create-views.sql
\`\`\`

### 3. Maintenance (Optional)
\`\`\`bash
# 7. Backup and maintenance utilities
07-backup-restore.sql
\`\`\`

## Tables Created

### Core Portfolio Tables
- `blog_posts` - Blog articles and content
- `projects` - Portfolio projects
- `skills` - Technical skills and expertise
- `education` - Educational background
- `certifications` - Professional certifications
- `personal_info` - Personal information and contact details
- `work_experience` - Professional work history

### Additional Tables
- `testimonials` - Client testimonials and reviews
- `contact_messages` - Contact form submissions
- `newsletter_subscribers` - Email newsletter subscribers
- `analytics` - Page view and usage analytics
- `comments` - Blog post comments

## Key Features

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for portfolio data
- Admin-only write access via service role
- Secure contact form and comment submission

### Performance
- Comprehensive indexing strategy
- Optimized queries for common operations
- Efficient full-text search capabilities

### Functionality
- Automatic timestamp updates
- Slug generation for blog posts
- Portfolio statistics functions
- Data validation and integrity checks

## Usage Examples

### Get Portfolio Statistics
\`\`\`sql
SELECT * FROM get_portfolio_stats();
\`\`\`

### Search Blog Posts
\`\`\`sql
SELECT * FROM search_blog_posts('machine learning');
\`\`\`

### Get Related Posts
\`\`\`sql
SELECT * FROM get_related_posts('building-ai-spam-detector', 3);
\`\`\`

### Validate Data Integrity
\`\`\`sql
SELECT * FROM validate_data_integrity();
\`\`\`

### Clean Up Old Data
\`\`\`sql
SELECT cleanup_old_data(90); -- Keep 90 days of data
\`\`\`

## Environment Variables Required

Make sure these environment variables are set in your Supabase project:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

## Notes

- All tables use UUID primary keys for better scalability
- Timestamps are automatically managed with triggers
- Sample data includes realistic portfolio content
- Views provide convenient access to common queries
- Functions enable advanced database operations

## Customization

Feel free to modify the sample data in `05-seed-sample-data.sql` to match your actual:
- Personal information
- Skills and experience levels
- Education background
- Certifications
- Projects and work history

## Maintenance

Regular maintenance tasks:
- Run `cleanup_old_data()` monthly to remove old analytics
- Use `validate_data_integrity()` to check for data issues
- Monitor table sizes and performance
- Update sample data as needed
