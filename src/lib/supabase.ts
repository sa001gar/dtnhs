
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Initialize Supabase client using values from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key. Please check your .env file.');
}

export const supabase = createClient<Database>(
  supabaseUrl || '', 
  supabaseAnonKey || '',
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
