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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          public_profile: boolean | null
          role: string | null
          verify: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          public_profile?: boolean | null
          role?: string | null
          verify?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          public_profile?: boolean | null
          role?: string | null
          verify?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      baiviet: {
        Row: {
          id: string
          tieude: string
          noidung: string
          tomtat: string | null
          anh_dai_dien: string | null
          trang_thai: 'draft' | 'published' | 'archived'
          admin_id: string
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          tieude: string
          noidung: string
          tomtat?: string | null
          anh_dai_dien?: string | null
          trang_thai?: 'draft' | 'published' | 'archived'
          admin_id: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          tieude?: string
          noidung?: string
          tomtat?: string | null
          anh_dai_dien?: string | null
          trang_thai?: 'draft' | 'published' | 'archived'
          admin_id?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
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
}
