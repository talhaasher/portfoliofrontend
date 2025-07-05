-- Add Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 5) DEFAULT 3,
  icon VARCHAR(50),
  color VARCHAR(20) DEFAULT 'blue',
  years_experience INTEGER DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Education table
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution VARCHAR(200) NOT NULL,
  degree VARCHAR(200) NOT NULL,
  field_of_study VARCHAR(200),
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  grade VARCHAR(20),
  description TEXT,
  location VARCHAR(100),
  logo_url VARCHAR(500),
  achievements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  issuing_organization VARCHAR(200) NOT NULL,
  issue_date DATE NOT NULL,
  expiration_date DATE,
  credential_id VARCHAR(100),
  credential_url VARCHAR(500),
  description TEXT,
  logo_url VARCHAR(500),
  skills TEXT[],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(is_featured);
CREATE INDEX IF NOT EXISTS idx_education_current ON education(is_current);
CREATE INDEX IF NOT EXISTS idx_education_end_date ON education(end_date DESC);
CREATE INDEX IF NOT EXISTS idx_certifications_featured ON certifications(is_featured);
CREATE INDEX IF NOT EXISTS idx_certifications_issue_date ON certifications(issue_date DESC);

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on education" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read access on certifications" ON certifications FOR SELECT USING (true);

-- Create policies for admin write access (you'll need to adjust based on your auth setup)
CREATE POLICY "Allow admin full access on skills" ON skills FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow admin full access on education" ON education FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow admin full access on certifications" ON certifications FOR ALL USING (auth.role() = 'service_role');
