
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table types
export type AdminUser = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export type News = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  attachment_url?: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  class: string;
  subject: string;
  created_at: string;
  updated_at: string;
  created_by: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  category: string;
  author: string;
  created_at: string;
  updated_at: string;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
  updated_at: string;
  replies_count: number;
};

export type ForumReply = {
  id: string;
  post_id: string;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  created_at: string;
  created_by: string;
};

export type Alumni = {
  id: string;
  name: string;
  email: string;
  batch_year: number;
  current_occupation: string;
  institution?: string;
  phone?: string;
  message?: string;
  created_at: string;
};
