
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string
          user_id: string
          name: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          image_url: string | null
          author_name: string
          author_role: string | null
          author_avatar: string | null
          created_at: string
          updated_at: string
          published: boolean
          categories: string[]
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          image_url?: string | null
          author_name: string
          author_role?: string | null
          author_avatar?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          categories?: string[]
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          image_url?: string | null
          author_name?: string
          author_role?: string | null
          author_avatar?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          categories?: string[]
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      exam_schedules: {
        Row: {
          id: string
          exam_type: string
          class_name: string
          date_range: string
          details: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_type: string
          class_name: string
          date_range: string
          details: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_type?: string
          class_name?: string
          date_range?: string
          details?: Json
          created_at?: string
          updated_at?: string
        }
      }
      forum_replies: {
        Row: {
          id: string
          thread_id: string
          content: string
          author_name: string
          author_avatar: string | null
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          content: string
          author_name: string
          author_avatar?: string | null
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          content?: string
          author_name?: string
          author_avatar?: string | null
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      forum_threads: {
        Row: {
          id: string
          title: string
          preview: string
          content: string
          category: string
          author_name: string
          author_avatar: string | null
          replies_count: number
          views_count: number
          likes_count: number
          is_popular: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          preview: string
          content: string
          category: string
          author_name: string
          author_avatar?: string | null
          replies_count?: number
          views_count?: number
          likes_count?: number
          is_popular?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          preview?: string
          content?: string
          category?: string
          author_name?: string
          author_avatar?: string | null
          replies_count?: number
          views_count?: number
          likes_count?: number
          is_popular?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      gallery_photos: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string
          category: string | null
          event_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url: string
          category?: string | null
          event_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string
          category?: string | null
          event_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          title: string
          content: string
          category: string | null
          file_url: string | null
          important: boolean
          publish_date: string
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string | null
          file_url?: string | null
          important?: boolean
          publish_date?: string
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string | null
          file_url?: string | null
          important?: boolean
          publish_date?: string
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
  storage: {
    Buckets: {
      school_files: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
        }
      }
    }
  }
}
