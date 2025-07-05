-- Insert comprehensive sample data
-- Run this script to populate your database with sample content

-- Insert personal info
INSERT INTO personal_info (
    name, title, bio, email, phone, location, website,
    social_links, contact_info, preferences
) VALUES (
    'Talha',
    'AI Developer & Machine Learning Engineer',
    'Passionate about building intelligent systems and creating innovative solutions using AI, machine learning, and modern web technologies. With expertise spanning from deep learning to full-stack development, I help businesses leverage the power of artificial intelligence.',
    'talha@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    'https://talha-portfolio.vercel.app',
    '{"github": "https://github.com/talha", "linkedin": "https://linkedin.com/in/talha", "twitter": "https://twitter.com/talha"}',
    '{"availability": "Available for freelance projects", "response_time": "Within 24 hours", "preferred_contact": "email"}',
    '{"theme": "system", "newsletter": true, "notifications": true}'
) ON CONFLICT DO NOTHING;

-- Insert skills data
INSERT INTO skills (category, name, level, icon, color, years_experience, is_featured, description, proficiency_percentage) VALUES
-- AI & Machine Learning
('AI & Machine Learning', 'Python', 5, 'Code', 'blue', 4, true, 'Primary programming language for AI/ML development', 95),
('AI & Machine Learning', 'TensorFlow', 4, 'Brain', 'orange', 3, true, 'Deep learning framework for neural networks', 85),
('AI & Machine Learning', 'PyTorch', 4, 'Brain', 'red', 3, true, 'Research-focused deep learning framework', 80),
('AI & Machine Learning', 'Scikit-learn', 5, 'BarChart', 'green', 4, false, 'Machine learning library for classical algorithms', 90),
('AI & Machine Learning', 'OpenCV', 3, 'Eye', 'blue', 2, false, 'Computer vision and image processing', 70),
('AI & Machine Learning', 'NLP', 4, 'MessageSquare', 'purple', 3, true, 'Natural Language Processing and text analysis', 85),
('AI & Machine Learning', 'Hugging Face', 4, 'Bot', 'yellow', 2, true, 'Transformers and pre-trained models', 80),
('AI & Machine Learning', 'LangChain', 3, 'Link', 'green', 1, false, 'Framework for LLM applications', 75),

-- Web Development
('Web Development', 'React', 5, 'Code', 'blue', 4, true, 'Frontend library for building user interfaces', 95),
('Web Development', 'Next.js', 5, 'Globe', 'black', 3, true, 'Full-stack React framework', 90),
('Web Development', 'TypeScript', 4, 'Code', 'blue', 3, true, 'Typed JavaScript for better development', 85),
('Web Development', 'Node.js', 4, 'Server', 'green', 3, false, 'JavaScript runtime for backend development', 80),
('Web Development', 'Tailwind CSS', 5, 'Palette', 'cyan', 2, false, 'Utility-first CSS framework', 90),
('Web Development', 'API Development', 4, 'Zap', 'yellow', 3, false, 'RESTful and GraphQL API design', 85),

-- Data & Analytics
('Data & Analytics', 'Pandas', 5, 'Database', 'blue', 4, false, 'Data manipulation and analysis', 90),
('Data & Analytics', 'NumPy', 5, 'Calculator', 'blue', 4, false, 'Numerical computing with Python', 95),
('Data & Analytics', 'Matplotlib', 4, 'BarChart', 'orange', 3, false, 'Data visualization library', 80),
('Data & Analytics', 'SQL', 5, 'Database', 'blue', 5, true, 'Database querying and management', 95),
('Data & Analytics', 'Data Visualization', 4, 'PieChart', 'green', 3, false, 'Creating insightful data visualizations', 85),
('Data & Analytics', 'Statistical Analysis', 4, 'TrendingUp', 'purple', 3, false, 'Statistical modeling and analysis', 80),

-- Cloud & DevOps
('Cloud & DevOps', 'AWS', 3, 'Cloud', 'orange', 2, false, 'Amazon Web Services cloud platform', 70),
('Cloud & DevOps', 'Docker', 4, 'Package', 'blue', 2, true, 'Containerization and deployment', 85),
('Cloud & DevOps', 'Git', 5, 'GitBranch', 'red', 5, false, 'Version control and collaboration', 95),
('Cloud & DevOps', 'CI/CD', 3, 'Zap', 'green', 2, false, 'Continuous integration and deployment', 75),
('Cloud & DevOps', 'Vercel', 4, 'Globe', 'black', 2, false, 'Frontend deployment platform', 85),

-- Databases
('Databases', 'PostgreSQL', 4, 'Database', 'blue', 3, true, 'Advanced relational database', 85),
('Databases', 'MongoDB', 3, 'Database', 'green', 2, false, 'NoSQL document database', 75),
('Databases', 'Redis', 3, 'Zap', 'red', 1, false, 'In-memory data structure store', 70),
('Databases', 'Supabase', 4, 'Database', 'green', 2, true, 'Open source Firebase alternative', 80),
('Databases', 'Vector Databases', 3, 'Search', 'purple', 1, false, 'Pinecone, Weaviate for AI applications', 70)
ON CONFLICT DO NOTHING;

-- Insert education data
INSERT INTO education (
    institution, degree, field_of_study, start_date, end_date, is_current, 
    grade, gpa, description, location, achievements, coursework, honors
) VALUES
(
    'Stanford University',
    'Master of Science',
    'Computer Science - AI Specialization',
    '2020-09-01',
    '2022-06-15',
    false,
    '3.8 GPA',
    3.8,
    'Specialized in Machine Learning, Deep Learning, and Natural Language Processing. Completed advanced coursework in neural networks, computer vision, and AI ethics. Conducted research on transformer architectures and their applications in NLP.',
    'Stanford, CA',
    ARRAY['Dean''s List for 3 consecutive semesters', 'Outstanding Graduate Student Award', 'Published 2 research papers on NLP', 'Teaching Assistant for CS229 Machine Learning'],
    ARRAY['CS229 - Machine Learning', 'CS231n - Convolutional Neural Networks', 'CS224n - Natural Language Processing', 'CS221 - Artificial Intelligence', 'CS230 - Deep Learning'],
    ARRAY['Magna Cum Laude', 'Phi Beta Kappa Honor Society']
),
(
    'University of California, Berkeley',
    'Bachelor of Science',
    'Computer Science',
    '2016-08-20',
    '2020-05-15',
    false,
    '3.7 GPA',
    3.7,
    'Strong foundation in computer science fundamentals including algorithms, data structures, software engineering, and database systems. Active member of AI/ML club and participated in multiple hackathons.',
    'Berkeley, CA',
    ARRAY['Magna Cum Laude', 'ACM Programming Contest - 2nd Place', 'Teaching Assistant for CS61B Data Structures', 'President of AI/ML Student Club'],
    ARRAY['CS61A - Structure and Interpretation of Computer Programs', 'CS61B - Data Structures', 'CS170 - Efficient Algorithms', 'CS186 - Database Systems', 'CS188 - Artificial Intelligence'],
    ARRAY['Dean''s Honor List', 'Outstanding Leadership Award']
),
(
    'Coursera',
    'Professional Certificate',
    'Google AI for Everyone',
    '2023-01-01',
    '2023-03-15',
    false,
    'Completed with Distinction',
    null,
    'Comprehensive program covering AI fundamentals, machine learning applications, and ethical AI development practices. Gained practical experience with TensorFlow and real-world AI implementations.',
    'Online',
    ARRAY['Completed all 6 courses with distinction', 'Capstone project on AI in healthcare', 'Peer review excellence award'],
    ARRAY['AI Fundamentals', 'Machine Learning Basics', 'TensorFlow Introduction', 'AI Ethics', 'AI in Business', 'Capstone Project'],
    ARRAY['Certificate of Excellence']
)
ON CONFLICT DO NOTHING;

-- Insert certifications data
INSERT INTO certifications (
    name, issuing_organization, issue_date, expiration_date, credential_id, 
    credential_url, verification_url, description, skills, is_featured, score
) VALUES
(
    'AWS Certified Solutions Architect - Associate',
    'Amazon Web Services',
    '2023-06-15',
    '2026-06-15',
    'AWS-SAA-C03-123456',
    'https://aws.amazon.com/verification',
    'https://www.credly.com/badges/aws-saa-123456',
    'Validates expertise in designing distributed systems on AWS platform with focus on scalability, security, and cost optimization. Demonstrates ability to architect and deploy secure applications on AWS technologies.',
    ARRAY['AWS', 'Cloud Architecture', 'System Design', 'Security', 'Scalability', 'Cost Optimization'],
    true,
    '850/1000'
),
(
    'TensorFlow Developer Certificate',
    'Google',
    '2023-03-20',
    '2026-03-20',
    'TF-DEV-789012',
    'https://tensorflow.org/certificate',
    'https://www.credential.net/tensorflow-789012',
    'Demonstrates proficiency in building and training neural networks using TensorFlow, including computer vision and NLP applications. Validates skills in model optimization and deployment.',
    ARRAY['TensorFlow', 'Deep Learning', 'Neural Networks', 'Python', 'Computer Vision', 'NLP'],
    true,
    '95%'
),
(
    'Professional Data Scientist',
    'IBM',
    '2022-11-10',
    '2025-11-10',
    'IBM-DS-345678',
    'https://ibm.com/credentials',
    'https://www.credly.com/badges/ibm-data-scientist-345678',
    'Comprehensive certification covering the entire data science lifecycle from data collection to model deployment. Includes hands-on experience with Python, SQL, machine learning, and data visualization.',
    ARRAY['Data Science', 'Machine Learning', 'Python', 'Statistics', 'Data Visualization', 'SQL'],
    true,
    '92%'
),
(
    'Meta React Developer Professional Certificate',
    'Meta',
    '2023-08-05',
    '2026-08-05',
    'META-REACT-901234',
    'https://developers.facebook.com/certification',
    'https://www.coursera.org/account/accomplishments/professional-cert/META-REACT-901234',
    'Advanced React development skills including hooks, context, performance optimization, and testing. Covers modern React patterns and best practices for building scalable applications.',
    ARRAY['React', 'JavaScript', 'Frontend Development', 'Testing', 'Performance Optimization', 'Modern Web Development'],
    false,
    '88%'
),
(
    'Certified Kubernetes Administrator (CKA)',
    'Cloud Native Computing Foundation',
    '2023-09-12',
    '2026-09-12',
    'CKA-567890',
    'https://cncf.io/certification',
    'https://www.credly.com/badges/cka-567890',
    'Validates skills in Kubernetes cluster administration, networking, security, and troubleshooting. Demonstrates ability to manage production Kubernetes environments.',
    ARRAY['Kubernetes', 'Docker', 'DevOps', 'Container Orchestration', 'Linux', 'Networking'],
    false,
    '87%'
),
(
    'OpenAI GPT-4 API Specialist',
    'OpenAI',
    '2023-10-01',
    null,
    'OPENAI-GPT4-112233',
    'https://openai.com/certification',
    'https://platform.openai.com/certificates/112233',
    'Specialized certification in building applications with GPT-4 API, including prompt engineering, fine-tuning, and responsible AI practices.',
    ARRAY['OpenAI API', 'GPT-4', 'Prompt Engineering', 'LLM Applications', 'AI Ethics'],
    true,
    '94%'
)
ON CONFLICT DO NOTHING;

-- Insert work experience
INSERT INTO work_experience (
    company, position, start_date, end_date, is_current, location, 
    company_url, description, responsibilities, achievements, technologies
) VALUES
(
    'TechCorp AI',
    'Senior AI Engineer',
    '2022-07-01',
    null,
    true,
    'San Francisco, CA',
    'https://techcorp-ai.com',
    'Leading AI initiatives and developing machine learning solutions for enterprise clients. Focus on NLP, computer vision, and recommendation systems.',
    ARRAY[
        'Design and implement machine learning models for production environments',
        'Lead a team of 5 junior engineers and data scientists',
        'Collaborate with product managers to define AI strategy',
        'Optimize model performance and reduce inference costs by 40%',
        'Mentor junior developers and conduct technical interviews'
    ],
    ARRAY[
        'Increased model accuracy by 25% through advanced feature engineering',
        'Reduced training time by 60% using distributed computing',
        'Successfully deployed 15+ ML models to production',
        'Led the migration to cloud-native ML infrastructure'
    ],
    ARRAY['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes', 'MLflow']
),
(
    'DataFlow Solutions',
    'Machine Learning Engineer',
    '2020-08-15',
    '2022-06-30',
    false,
    'Palo Alto, CA',
    'https://dataflow-solutions.com',
    'Developed end-to-end machine learning pipelines and data processing systems for fintech and healthcare clients.',
    ARRAY[
        'Built scalable ML pipelines using Apache Airflow and Spark',
        'Implemented real-time fraud detection systems',
        'Developed recommendation engines for e-commerce platforms',
        'Created automated model monitoring and retraining systems'
    ],
    ARRAY[
        'Reduced fraud detection false positives by 35%',
        'Improved recommendation system CTR by 28%',
        'Automated 80% of model deployment processes',
        'Received "Outstanding Performance" award for 2021'
    ],
    ARRAY['Python', 'Scikit-learn', 'Apache Spark', 'PostgreSQL', 'Redis', 'FastAPI']
)
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
    title, slug, excerpt, content, category, author, read_time, 
    published, featured, tags, meta_description
) VALUES
(
    'Building My AI Spam Detector: A Complete Guide',
    'building-ai-spam-detector-complete-guide',
    'Learn how I built an advanced spam detection system using machine learning algorithms and achieved 95% accuracy. This comprehensive guide covers data preprocessing, feature engineering, model selection, and deployment strategies.',
    'In this comprehensive guide, I''ll walk you through the process of building an advanced spam detection system using machine learning algorithms. This project achieved a 95% accuracy rate and demonstrates practical applications of natural language processing and classification algorithms.

## The Problem

Email spam continues to be a significant issue, with billions of spam emails sent daily. Traditional rule-based filters often fail to catch sophisticated spam attempts while sometimes flagging legitimate emails as spam.

## Approach

I decided to use a machine learning approach that combines multiple techniques:

### 1. Data Collection and Preprocessing

First, I gathered a diverse dataset of emails, including both spam and legitimate messages. The preprocessing steps included:

- Text cleaning and normalization
- Removing HTML tags and special characters
- Tokenization and stemming
- Feature extraction using TF-IDF

### 2. Feature Engineering

Key features that proved most effective:

- **Text Features**: TF-IDF vectors, n-grams
- **Metadata Features**: Email length, number of links, sender reputation
- **Linguistic Features**: Sentiment analysis, readability scores

### 3. Model Selection

I experimented with several algorithms:

- **Naive Bayes**: Great baseline performance
- **Random Forest**: Good feature importance insights
- **XGBoost**: Best overall performance
- **Neural Networks**: Competitive but more complex

## Implementation

The final model achieved:

- **95% accuracy** on the test set
- **Low false positive rate** (< 2%)
- **Fast inference time** (< 100ms per email)

## Lessons Learned

1. **Data quality matters more than quantity**
2. **Feature engineering is crucial for NLP tasks**
3. **Regular model retraining is essential**
4. **Production deployment requires careful monitoring**

This project demonstrates the practical application of machine learning in solving real-world problems.',
    'Machine Learning',
    'Talha',
    '12 min read',
    true,
    true,
    ARRAY['Machine Learning', 'NLP', 'Python', 'Spam Detection', 'XGBoost'],
    'Complete guide to building an AI spam detector with 95% accuracy using machine learning and NLP techniques.'
),
(
    'Getting Started with LangChain: Building AI Applications',
    'getting-started-langchain-ai-applications',
    'A comprehensive guide to building AI applications with LangChain and large language models. Explore chains, agents, memory, and vector stores to create powerful AI-driven applications.',
    'LangChain is a powerful framework for developing applications powered by language models. In this guide, we''ll explore how to build sophisticated AI applications using LangChain''s core components.

## What is LangChain?

LangChain is a framework designed to simplify the creation of applications using large language models (LLMs). It provides a standard interface for chains, agents, and memory, making it easier to build complex AI applications.

## Core Components

### 1. Chains
Chains are the core of LangChain. They combine multiple components to create a sequence of operations.

### 2. Agents
Agents use LLMs to determine which actions to take and in what order.

### 3. Memory
Memory gives LLMs the ability to remember previous interactions.

### 4. Vector Stores
Vector stores allow you to store and search through unstructured data.

## Getting Started

Let''s build a simple question-answering system using LangChain.

This guide covers the fundamentals of building AI applications with LangChain and provides practical examples for getting started.',
    'AI Development',
    'Talha',
    '15 min read',
    true,
    true,
    ARRAY['LangChain', 'AI Development', 'LLM', 'Python', 'OpenAI'],
    'Learn to build powerful AI applications with LangChain framework and large language models.'
),
(
    'Next.js 15 Features Every Developer Should Know',
    'nextjs-15-features-developers-should-know',
    'Exploring the latest features in Next.js 15 and how they can improve your web development workflow. From improved performance to new developer experience enhancements.',
    'Next.js 15 brings exciting new features and improvements that enhance both developer experience and application performance. Let''s explore the key updates.

## New Features

### 1. Improved App Router
The App Router continues to evolve with better performance and new capabilities.

### 2. Enhanced Server Components
Server Components now offer better streaming and improved performance.

### 3. Better TypeScript Support
Enhanced TypeScript integration with improved type checking and IntelliSense.

## Performance Improvements

Next.js 15 includes significant performance optimizations that make applications faster and more efficient.

This overview covers the most important features and improvements in Next.js 15.',
    'Web Development',
    'Talha',
    '8 min read',
    true,
    false,
    ARRAY['Next.js', 'React', 'Web Development', 'JavaScript', 'TypeScript'],
    'Discover the latest Next.js 15 features and improvements for modern web development.'
)
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (
    title, description, technologies, github_url, demo_url, 
    is_featured, status, category, tags
) VALUES
(
    'AI Spam Detector',
    'Advanced email spam detection system using machine learning algorithms with 95% accuracy rate. Features real-time classification, model retraining pipeline, and comprehensive analytics dashboard.',
    ARRAY['Python', 'XGBoost', 'NLP', 'Flask', 'React', 'PostgreSQL'],
    'https://github.com/talha/ai-spam-detector',
    'https://spam-detector-demo.vercel.app',
    true,
    'completed',
    'Machine Learning',
    ARRAY['AI', 'NLP', 'Classification', 'Email Security']
),
(
    'Smart Chatbot Assistant',
    'Intelligent conversational AI powered by large language models with context awareness, memory, and integration with external APIs for enhanced functionality.',
    ARRAY['OpenAI API', 'LangChain', 'Next.js', 'Vector DB', 'TypeScript'],
    'https://github.com/talha/smart-chatbot',
    'https://smart-chatbot-demo.vercel.app',
    true,
    'completed',
    'AI Development',
    ARRAY['Chatbot', 'LLM', 'Conversational AI', 'RAG']
),
(
    'AI Content Generator',
    'Multi-modal content generation platform for blogs, social media, and marketing materials. Supports text, image, and video content creation with customizable templates.',
    ARRAY['GPT-4', 'DALL-E', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    'https://github.com/talha/ai-content-generator',
    'https://content-generator-demo.vercel.app',
    true,
    'completed',
    'AI Development',
    ARRAY['Content Generation', 'GPT-4', 'DALL-E', 'SaaS']
),
(
    'Real-time Analytics Dashboard',
    'Comprehensive analytics dashboard with real-time data visualization, custom metrics, and automated reporting for business intelligence.',
    ARRAY['React', 'D3.js', 'Node.js', 'WebSocket', 'Redis', 'PostgreSQL'],
    'https://github.com/talha/analytics-dashboard',
    'https://analytics-demo.vercel.app',
    false,
    'completed',
    'Web Development',
    ARRAY['Analytics', 'Dashboard', 'Real-time', 'Data Visualization']
),
(
    'ML Model Deployment Platform',
    'Platform for deploying and managing machine learning models with automatic scaling, monitoring, and A/B testing capabilities.',
    ARRAY['Python', 'FastAPI', 'Docker', 'Kubernetes', 'MLflow', 'Prometheus'],
    'https://github.com/talha/ml-deployment-platform',
    'https://ml-platform-demo.vercel.app',
    false,
    'in-progress',
    'MLOps',
    ARRAY['MLOps', 'Model Deployment', 'Kubernetes', 'Monitoring']
)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (
    name, position, company, content, rating, is_featured, is_approved
) VALUES
(
    'Sarah Johnson',
    'CTO',
    'TechStart Inc.',
    'Talha delivered an exceptional AI solution that transformed our customer service operations. His expertise in machine learning and attention to detail resulted in a 40% improvement in response accuracy.',
    5,
    true,
    true
),
(
    'Michael Chen',
    'Product Manager',
    'DataCorp',
    'Working with Talha was a fantastic experience. He not only built a robust recommendation system but also provided valuable insights that helped shape our product strategy.',
    5,
    true,
    true
),
(
    'Emily Rodriguez',
    'Lead Developer',
    'InnovateLab',
    'Talha''s full-stack development skills are impressive. He delivered a complex web application on time and exceeded our expectations with the quality of code and user experience.',
    5,
    false,
    true
)
ON CONFLICT DO NOTHING;

-- Insert sample contact messages (for testing)
INSERT INTO contact_messages (
    name, email, subject, message, status
) VALUES
(
    'John Doe',
    'john.doe@example.com',
    'Project Inquiry',
    'Hi Talha, I''m interested in discussing a machine learning project for my startup. Could we schedule a call?',
    'unread'
),
(
    'Jane Smith',
    'jane.smith@company.com',
    'Collaboration Opportunity',
    'Hello, I came across your portfolio and I''m impressed with your AI projects. I''d like to explore potential collaboration opportunities.',
    'read'
)
ON CONFLICT DO NOTHING;
