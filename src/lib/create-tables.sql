
-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Create notices table
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  attachment_url TEXT,
  priority TEXT NOT NULL DEFAULT 'medium', -- low, medium, high
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Create exams table
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT,
  class TEXT NOT NULL,
  subject TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Create blog table
CREATE TABLE blog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_posts table
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  replies_count INTEGER DEFAULT 0
);

-- Create forum_replies table
CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  user_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Create alumni table
CREATE TABLE alumni (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  batch_year INTEGER NOT NULL,
  current_occupation TEXT NOT NULL,
  institution TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Row Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (only admins can access this table)
CREATE POLICY "Admins can view all admin users" 
ON admin_users FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can insert admin users" 
ON admin_users FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update admin users" 
ON admin_users FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can delete admin users" 
ON admin_users FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

-- Create policies for other tables (similar pattern)
-- For example, for news table:
CREATE POLICY "News visible to all users" 
ON news FOR SELECT 
USING (true);

CREATE POLICY "News can be created by admins" 
ON news FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "News can be updated by admins" 
ON news FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

CREATE POLICY "News can be deleted by admins" 
ON news FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM admin_users WHERE user_id = auth.uid()
  )
);

-- Apply similar policies to other tables
-- You can copy the pattern above for notices, exams, blog, etc.
