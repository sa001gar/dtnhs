
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
          image_url?: string
          author_name: string
          author_role?: string
          author_avatar?: string
          created_at: string
          updated_at: string
          published?: boolean
          categories?: string[]
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          image_url?: string
          author_name: string
          author_role?: string
          author_avatar?: string
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
          image_url?: string
          author_name?: string
          author_role?: string
          author_avatar?: string
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
          status?: string
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
          author_avatar?: string
          likes_count?: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          thread_id: string
          content: string
          author_name: string
          author_avatar?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          thread_id?: string
          content?: string
          author_name?: string
          author_avatar?: string
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
          author_avatar?: string
          replies_count?: number
          views_count?: number
          likes_count?: number
          is_popular?: boolean
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
          author_avatar?: string
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
          author_avatar?: string
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
          description?: string
          image_url: string
          category?: string
          event_date?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          image_url: string
          category?: string
          event_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          category?: string
          event_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          title: string
          content: string
          category?: string
          file_url?: string
          important?: boolean
          publish_date: string
          expiry_date?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category?: string
          file_url?: string
          important?: boolean
          publish_date?: string
          expiry_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          file_url?: string
          important?: boolean
          publish_date?: string
          expiry_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      alumni: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          batch: string
          location: string
          education: string
          profession: string
          achievements?: string[]
          bio: string
          image?: string
          status: string
          created_at: string
          updated_at?: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          batch: string
          location: string
          education: string
          profession: string
          achievements?: string[]
          bio: string
          image?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          batch?: string
          location?: string
          education?: string
          profession?: string
          achievements?: string[]
          bio?: string
          image?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
