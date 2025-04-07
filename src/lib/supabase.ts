
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Initialize Supabase client using values from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tldfveoukmewmvhmwkzx.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZGZ2ZW91a21ld212aG13a3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NTUwNTMsImV4cCI6MjA1OTQzMTA1M30.LVe40vuL3OsgGH6i8RqT6HI49h6nr4BMxtboQ-cFU2k";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your .env file.');
}

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      storageKey: 'school-admin-auth',
      autoRefreshToken: true,
    }
  }
);

// Helper functions to check admin status
export const isAdminUser = async (): Promise<boolean> => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return false;
    }

    // Check if user exists in admin_users table
    const { data, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    
    return !!data && !adminError;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Helper function to log out
export const logoutAdmin = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};
