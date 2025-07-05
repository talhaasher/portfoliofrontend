-- Insert sample skills data
INSERT INTO skills (category, name, level, icon, color, years_experience, is_featured) VALUES
-- AI & Machine Learning
('AI & Machine Learning', 'Python', 5, 'Code', 'blue', 4, true),
('AI & Machine Learning', 'TensorFlow', 4, 'Brain', 'orange', 3, true),
('AI & Machine Learning', 'PyTorch', 4, 'Brain', 'red', 3, true),
('AI & Machine Learning', 'Scikit-learn', 5, 'BarChart', 'green', 4, false),
('AI & Machine Learning', 'OpenCV', 3, 'Eye', 'blue', 2, false),
('AI & Machine Learning', 'NLP', 4, 'MessageSquare', 'purple', 3, true),

-- Web Development
('Web Development', 'React', 5, 'Code', 'blue', 4, true),
('Web Development', 'Next.js', 5, 'Globe', 'black', 3, true),
('Web Development', 'TypeScript', 4, 'Code', 'blue', 3, true),
('Web Development', 'Node.js', 4, 'Server', 'green', 3, false),
('Web Development', 'Tailwind CSS', 5, 'Palette', 'cyan', 2, false),
('Web Development', 'API Development', 4, 'Zap', 'yellow', 3, false),

-- Data & Analytics
('Data & Analytics', 'Pandas', 5, 'Database', 'blue', 4, false),
('Data & Analytics', 'NumPy', 5, 'Calculator', 'blue', 4, false),
('Data & Analytics', 'Matplotlib', 4, 'BarChart', 'orange', 3, false),
('Data & Analytics', 'SQL', 5, 'Database', 'blue', 5, true),
('Data & Analytics', 'Data Visualization', 4, 'PieChart', 'green', 3, false),
('Data & Analytics', 'Statistical Analysis', 4, 'TrendingUp', 'purple', 3, false),

-- Cloud & DevOps
('Cloud & DevOps', 'AWS', 3, 'Cloud', 'orange', 2, false),
('Cloud & DevOps', 'Docker', 4, 'Package', 'blue', 2, true),
('Cloud & DevOps', 'Git', 5, 'GitBranch', 'red', 5, false),
('Cloud & DevOps', 'CI/CD', 3, 'Zap', 'green', 2, false),
('Cloud & DevOps', 'Vercel', 4, 'Globe', 'black', 2, false),

-- Databases
('Databases', 'PostgreSQL', 4, 'Database', 'blue', 3, true),
('Databases', 'MongoDB', 3, 'Database', 'green', 2, false),
('Databases', 'Redis', 3, 'Zap', 'red', 1, false),
('Databases', 'Supabase', 4, 'Database', 'green', 2, true)
ON CONFLICT DO NOTHING;

-- Insert sample education data
INSERT INTO education (institution, degree, field_of_study, start_date, end_date, is_current, grade, description, location, achievements) VALUES
('Stanford University', 'Master of Science', 'Computer Science - AI Specialization', '2020-09-01', '2022-06-15', false, '3.8 GPA', 'Specialized in Machine Learning, Deep Learning, and Natural Language Processing. Completed advanced coursework in neural networks, computer vision, and AI ethics.', 'Stanford, CA', ARRAY['Dean''s List for 3 consecutive semesters', 'Outstanding Graduate Student Award', 'Published 2 research papers on NLP']),

('University of California, Berkeley', 'Bachelor of Science', 'Computer Science', '2016-08-20', '2020-05-15', false, '3.7 GPA', 'Strong foundation in computer science fundamentals including algorithms, data structures, software engineering, and database systems. Active member of AI/ML club.', 'Berkeley, CA', ARRAY['Magna Cum Laude', 'ACM Programming Contest - 2nd Place', 'Teaching Assistant for Data Structures course']),

('Coursera', 'Professional Certificate', 'Google AI for Everyone', '2023-01-01', '2023-03-15', false, 'Completed', 'Comprehensive program covering AI fundamentals, machine learning applications, and ethical AI development practices.', 'Online', ARRAY['Completed all 6 courses with distinction', 'Capstone project on AI in healthcare'])
ON CONFLICT DO NOTHING;

-- Insert sample certifications data
INSERT INTO certifications (name, issuing_organization, issue_date, expiration_date, credential_id, credential_url, description, skills, is_featured) VALUES
('AWS Certified Solutions Architect', 'Amazon Web Services', '2023-06-15', '2026-06-15', 'AWS-SAA-123456', 'https://aws.amazon.com/verification', 'Validates expertise in designing distributed systems on AWS platform with focus on scalability, security, and cost optimization.', ARRAY['AWS', 'Cloud Architecture', 'System Design', 'Security'], true),

('TensorFlow Developer Certificate', 'Google', '2023-03-20', '2026-03-20', 'TF-DEV-789012', 'https://tensorflow.org/certificate', 'Demonstrates proficiency in building and training neural networks using TensorFlow, including computer vision and NLP applications.', ARRAY['TensorFlow', 'Deep Learning', 'Neural Networks', 'Python'], true),

('Professional Data Scientist', 'IBM', '2022-11-10', '2025-11-10', 'IBM-DS-345678', 'https://ibm.com/credentials', 'Comprehensive certification covering the entire data science lifecycle from data collection to model deployment.', ARRAY['Data Science', 'Machine Learning', 'Python', 'Statistics'], true),

('React Developer Certification', 'Meta', '2023-08-05', '2026-08-05', 'META-REACT-901234', 'https://developers.facebook.com/certification', 'Advanced React development skills including hooks, context, performance optimization, and testing.', ARRAY['React', 'JavaScript', 'Frontend Development', 'Testing'], false),

('Certified Kubernetes Administrator', 'Cloud Native Computing Foundation', '2023-09-12', '2026-09-12', 'CKA-567890', 'https://cncf.io/certification', 'Validates skills in Kubernetes cluster administration, networking, security, and troubleshooting.', ARRAY['Kubernetes', 'Docker', 'DevOps', 'Container Orchestration'], false)
ON CONFLICT DO NOTHING;
