-- Enable Row Level Security (RLS) for all tables
-- Run this script to secure your data

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (portfolio data)
CREATE POLICY "Allow public read access on blog_posts" ON blog_posts 
  FOR SELECT USING (published = true);

CREATE POLICY "Allow public read access on projects" ON projects 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on skills" ON skills 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on education" ON education 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on certifications" ON certifications 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on personal_info" ON personal_info 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on work_experience" ON work_experience 
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON testimonials 
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow public read access on approved comments" ON comments 
  FOR SELECT USING (status = 'approved');

-- Create policies for admin access (service role)
CREATE POLICY "Allow service role full access on blog_posts" ON blog_posts 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on projects" ON projects 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on skills" ON skills 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on education" ON education 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on certifications" ON certifications 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on personal_info" ON personal_info 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on work_experience" ON work_experience 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on testimonials" ON testimonials 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on contact_messages" ON contact_messages 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on newsletter_subscribers" ON newsletter_subscribers 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on analytics" ON analytics 
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on comments" ON comments 
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public to insert contact messages and comments
CREATE POLICY "Allow public to insert contact messages" ON contact_messages 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to insert comments" ON comments 
  FOR INSERT WITH CHECK (true);

-- Allow public to subscribe to newsletter
CREATE POLICY "Allow public to insert newsletter subscriptions" ON newsletter_subscribers 
  FOR INSERT WITH CHECK (true);

-- Allow public to insert analytics data
CREATE POLICY "Allow public to insert analytics" ON analytics 
  FOR INSERT WITH CHECK (true);
