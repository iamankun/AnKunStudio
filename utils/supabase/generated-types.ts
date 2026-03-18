export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      baiviet: {
        Row: {
          admin_id: string | null
          anh_dai_dien: string | null
          category: string | null
          created_at: string | null
          id: string
          noidung: string
          published_at: string | null
          tags: string | null
          tieude: string
          tomtat: string | null
          trang_thai: string | null
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          anh_dai_dien?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          noidung: string
          published_at?: string | null
          tags?: string | null
          tieude: string
          tomtat?: string | null
          trang_thai?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          anh_dai_dien?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          noidung?: string
          published_at?: string | null
          tags?: string | null
          tieude?: string
          tomtat?: string | null
          trang_thai?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "baiviet_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ChuongTrinhTV: {
        Row: {
          created_at: string | null
          id: number
          metadata: Json
          seasons: Json
          title: string
          tmdb_id: number
          updated_at: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          metadata?: Json
          seasons?: Json
          title: string
          tmdb_id: number
          updated_at?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          metadata?: Json
          seasons?: Json
          title?: string
          tmdb_id?: number
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      comment_reactions: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          reaction_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          reaction_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          reaction_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          dislikes: number | null
          id: string
          is_deleted: boolean | null
          is_pinned: boolean | null
          likes: number | null
          movie_id: number | null
          parent_id: string | null
          tv_id: number | null
          updated_at: string | null
          user_avatar: string | null
          user_id: string
          username: string
        }
        Insert: {
          content: string
          created_at?: string | null
          dislikes?: number | null
          id?: string
          is_deleted?: boolean | null
          is_pinned?: boolean | null
          likes?: number | null
          movie_id?: number | null
          parent_id?: string | null
          tv_id?: number | null
          updated_at?: string | null
          user_avatar?: string | null
          user_id: string
          username: string
        }
        Update: {
          content?: string
          created_at?: string | null
          dislikes?: number | null
          id?: string
          is_deleted?: boolean | null
          is_pinned?: boolean | null
          likes?: number | null
          movie_id?: number | null
          parent_id?: string | null
          tv_id?: number | null
          updated_at?: string | null
          user_avatar?: string | null
          user_id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      DienAnh: {
        Row: {
          created_at: string | null
          id: number
          metadata: Json
          sources: Json
          title: string
          tmdb_id: number
          updated_at: string | null
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          metadata?: Json
          sources?: Json
          title: string
          tmdb_id: number
          updated_at?: string | null
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          metadata?: Json
          sources?: Json
          title?: string
          tmdb_id?: number
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      histories: {
        Row: {
          adult: boolean
          backdrop_path: string | null
          completed: boolean
          created_at: string
          duration: number
          episode: number
          id: number
          last_position: number
          media_id: number
          poster_path: string | null
          release_date: string
          season: number
          title: string
          type: string
          updated_at: string
          user_id: string
          vote_average: number
        }
        Insert: {
          adult: boolean
          backdrop_path?: string | null
          completed?: boolean
          created_at?: string
          duration?: number
          episode?: number
          id?: number
          last_position?: number
          media_id: number
          poster_path?: string | null
          release_date: string
          season?: number
          title: string
          type: string
          updated_at?: string
          user_id: string
          vote_average: number
        }
        Update: {
          adult?: boolean
          backdrop_path?: string | null
          completed?: boolean
          created_at?: string
          duration?: number
          episode?: number
          id?: number
          last_position?: number
          media_id?: number
          poster_path?: string | null
          release_date?: string
          season?: number
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
          vote_average?: number
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          location: string | null
          public_profile: boolean | null
          role: string | null
          updated_at: string | null
          username: string | null
          verify: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          public_profile?: boolean | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          verify?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          public_profile?: boolean | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
          verify?: string | null
          website?: string | null
        }
        Relationships: []
      }
      TiviChannels: {
        Row: {
          category: string | null
          channel_id: string
          country: string | null
          created_at: string | null
          id: number
          logo: string | null
          name: string
          quality: string | null
          type: string | null
          updated_at: string | null
          url: string
        }
        Insert: {
          category?: string | null
          channel_id: string
          country?: string | null
          created_at?: string | null
          id?: number
          logo?: string | null
          name: string
          quality?: string | null
          type?: string | null
          updated_at?: string | null
          url: string
        }
        Update: {
          category?: string | null
          channel_id?: string
          country?: string | null
          created_at?: string | null
          id?: number
          logo?: string | null
          name?: string
          quality?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          adult: boolean
          backdrop_path: string | null
          created_at: string
          id: number
          poster_path: string | null
          release_date: string
          title: string
          type: string
          user_id: string
          vote_average: number
        }
        Insert: {
          adult: boolean
          backdrop_path?: string | null
          created_at?: string
          id: number
          poster_path?: string | null
          release_date: string
          title: string
          type: string
          user_id: string
          vote_average: number
        }
        Update: {
          adult?: boolean
          backdrop_path?: string | null
          created_at?: string
          id?: number
          poster_path?: string | null
          release_date?: string
          title?: string
          type?: string
          user_id?: string
          vote_average?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      decrement_comment_dislikes: {
        Args: { comment_id: string }
        Returns: undefined
      }
      decrement_comment_likes: {
        Args: { comment_id: string }
        Returns: undefined
      }
      exec_sql: { Args: { sql: string }; Returns: string }
      generate_unique_username: { Args: { email: string }; Returns: string }
      get_table_info: {
        Args: { p_table_name: string }
        Returns: {
          column_default: string
          column_name: string
          data_type: string
          is_nullable: string
          table_name: string
        }[]
      }
      increment_comment_dislikes: {
        Args: { comment_id: string }
        Returns: undefined
      }
      increment_comment_likes: {
        Args: { comment_id: string }
        Returns: undefined
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
