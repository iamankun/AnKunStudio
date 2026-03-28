import type { TablesInsert, TablesUpdate } from '@/utils/supabase/generated-types';

// Database types for CineVerse
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'member' | 'admin';
  created_at: string;
  verify: string;
  username?: string;
  bio?: string;
  website?: string;
  location?: string;
  avatar_url?: string;
  public_profile?: boolean;
  updated_at?: string;
}

// Comment types
export interface Comment {
  id: string;
  movie_id: number | null;
  tv_id: number | null;
  user_id: string;
  username: string;
  user_avatar: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  dislikes: number;
  parent_id: string | null;
  is_deleted: boolean;
  is_pinned: boolean;
}

export type CommentRow = Comment;
export type CommentInsert = Omit<Comment, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};
export type CommentUpdate = Partial<Comment>;

// Supabase types
export type ProfileRow = Profile;
export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<Pick<Profile, 'id' | 'created_at'>>;

// Social Links type
export interface SocialLinks {
  spotify?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
  apple_music?: string;
  soundcloud?: string;
  youtube?: string;
}

// Artist types
export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
  cover_image_url: string | null;
  genre: string[] | null;
  social_links: SocialLinks | null;
  monthly_listeners: string | null;
  followers: string | null;
  total_streams: string | null;
  top_chart: string | null;
  verified: boolean | null;
  is_active: boolean | null;
  country: string | null;
  city: string | null;
  label: string | null;
  created_at: string;
  updated_at: string | null;
  [key: string]: unknown;
}

export type ArtistRow = Artist;
export type ArtistInsert = TablesInsert<'artists'>;
export type ArtistUpdate = TablesUpdate<'artists'>;

// Database schema type
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      artists: {
        Row: ArtistRow;
        Insert: ArtistInsert;
        Update: ArtistUpdate;
      };
      comments: {
        Row: CommentRow;
        Insert: CommentInsert;
        Update: CommentUpdate;
      };
    };
  };
}
