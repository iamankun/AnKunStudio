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
      // Catalog tables
      the_loai: {
        Row: {
          id: number
          ten_the_loai: string
          mo_ta: string | null
          trang_thai: string
          ngay_tao: string
        }
        Insert: {
          id?: number
          ten_the_loai: string
          mo_ta?: string | null
          trang_thai?: string
          ngay_tao?: string
        }
        Update: {
          id?: number
          ten_the_loai?: string
          mo_ta?: string | null
          trang_thai?: string
          ngay_tao?: string
        }
        Relationships: []
      }
      album: {
        Row: {
          id: number
          ten_album: string
          ma_album: string
          artist_id: string
          loai_phat_hanh: string
          mo_ta: string | null
          anh_bia: string | null
          ngay_phat_hanh: string | null
          nha_phan_phoi: string | null
          the_loai_ids: Json | null
          upc: string | null
          iswc: string | null
          tu_khoa: string | null
          mo_ta_ngan: string | null
          ngon_ngu: string
          trang_chu: boolean
          trang_thai_index: string
          trang_thai: string
          ghi_chu: string | null
          ngay_tao: string
          ngay_cap_nhat: string
        }
        Insert: {
          id?: number
          ten_album: string
          ma_album: string
          artist_id: string
          loai_phat_hanh: string
          mo_ta?: string | null
          anh_bia?: string | null
          ngay_phat_hanh?: string | null
          nha_phan_phoi?: string | null
          the_loai_ids?: Json | null
          upc?: string | null
          iswc?: string | null
          tu_khoa?: string | null
          mo_ta_ngan?: string | null
          ngon_ngu?: string
          trang_chu?: boolean
          trang_thai_index?: string
          trang_thai?: string
          ghi_chu?: string | null
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Update: {
          id?: number
          ten_album?: string
          ma_album?: string
          artist_id?: string
          loai_phat_hanh?: string
          mo_ta?: string | null
          anh_bia?: string | null
          ngay_phat_hanh?: string | null
          nha_phan_phoi?: string | null
          the_loai_ids?: Json | null
          upc?: string | null
          iswc?: string | null
          tu_khoa?: string | null
          mo_ta_ngan?: string | null
          ngon_ngu?: string
          trang_chu?: boolean
          trang_thai_index?: string
          trang_thai?: string
          ghi_chu?: string | null
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      bai_hat: {
        Row: {
          id: number
          ten_bai_hat: string
          ma_bai_hat: string | null
          album_id: number | null
          artist_id: string
          thu_tu: number | null
          thoi_luong: string | null
          file_mp3: string | null
          isrc: string | null
          lyric: string | null
          the_loai_ids: Json | null
          trang_thai: string
          ngay_tao: string
          ngay_cap_nhat: string
        }
        Insert: {
          id?: number
          ten_bai_hat: string
          ma_bai_hat?: string | null
          album_id?: number | null
          artist_id: string
          thu_tu?: number | null
          thoi_luong?: string | null
          file_mp3?: string | null
          isrc?: string | null
          lyric?: string | null
          the_loai_ids?: Json | null
          trang_thai?: string
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Update: {
          id?: number
          ten_bai_hat?: string
          ma_bai_hat?: string | null
          album_id?: number | null
          artist_id?: string
          thu_tu?: number | null
          thoi_luong?: string | null
          file_mp3?: string | null
          isrc?: string | null
          lyric?: string | null
          the_loai_ids?: Json | null
          trang_thai?: string
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Relationships: [
          {
            foreignKeyName: "bai_hat_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bai_hat_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      phat_hanh: {
        Row: {
          id: number
          album_id: number
          ma_phat_hanh: string
          ngay_phat_hanh_du_kien: string | null
          ngay_phat_hanh_thuc_te: string | null
          nha_phan_phoi: string | null
          danh_sach_nen_tang: Json | null
          trang_thai: string
          ly_do_tu_choi: string | null
          doanh_so: number
          luot_nghe: number
          khu_vuc_phat_hanh: Json | null
          ngay_tu_choi: string | null
          ly_do_thu_hoi: string | null
          so_luong_nen_tang: number
          ngay_tao: string
          ngay_cap_nhat: string
        }
        Insert: {
          id?: number
          album_id: number
          ma_phat_hanh: string
          ngay_phat_hanh_du_kien?: string | null
          ngay_phat_hanh_thuc_te?: string | null
          nha_phan_phoi?: string | null
          danh_sach_nen_tang?: Json | null
          trang_thai?: string
          ly_do_tu_choi?: string | null
          doanh_so?: number
          luot_nghe?: number
          khu_vuc_phat_hanh?: Json | null
          ngay_tu_choi?: string | null
          ly_do_thu_hoi?: string | null
          so_luong_nen_tang?: number
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Update: {
          id?: number
          album_id?: number
          ma_phat_hanh?: string
          ngay_phat_hanh_du_kien?: string | null
          ngay_phat_hanh_thuc_te?: string | null
          nha_phan_phoi?: string | null
          danh_sach_nen_tang?: Json | null
          trang_thai?: string
          ly_do_tu_choi?: string | null
          doanh_so?: number
          luot_nghe?: number
          khu_vuc_phat_hanh?: Json | null
          ngay_tu_choi?: string | null
          ly_do_thu_hoi?: string | null
          so_luong_nen_tang?: number
          ngay_tao?: string
          ngay_cap_nhat?: string
        }
        Relationships: [
          {
            foreignKeyName: "phat_hanh_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
      }
      thong_ke: {
        Row: {
          id: number
          album_id: number
          loai_thong_ke: string
          gia_tri: number
          ngay_du_lieu: string
          nen_tang: string | null
          ngay_tao: string
        }
        Insert: {
          id?: number
          album_id: number
          loai_thong_ke: string
          gia_tri: number
          ngay_du_lieu: string
          nen_tang?: string | null
          ngay_tao?: string
        }
        Update: {
          id?: number
          album_id?: number
          loai_thong_ke?: string
          gia_tri?: number
          ngay_du_lieu?: string
          nen_tang?: string | null
          ngay_tao?: string
        }
        Relationships: [
          {
            foreignKeyName: "thong_ke_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
      }
      artist_album: {
        Row: {
          id: number
          artist_id: string
          album_id: number
          vai_tro: string
          ngay_tao: string
        }
        Insert: {
          id?: number
          artist_id: string
          album_id: number
          vai_tro?: string
          ngay_tao?: string
        }
        Update: {
          id?: number
          artist_id?: string
          album_id?: number
          vai_tro?: string
          ngay_tao?: string
        }
        Relationships: [
          {
            foreignKeyName: "artist_album_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artist_album_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
      }
      album_hop_tac: {
        Row: {
          id: number
          album_id: number
          artist_id: string
          vai_tro: string
          ty_le_royalty: number
          trang_thai: string
          ngay_moi: string | null
          ngay_chap_nhan: string | null
          ghi_chu: string | null
          ngay_tao: string
        }
        Insert: {
          id?: number
          album_id: number
          artist_id: string
          vai_tro: string
          ty_le_royalty?: number
          trang_thai?: string
          ngay_moi?: string | null
          ngay_chap_nhan?: string | null
          ghi_chu?: string | null
          ngay_tao?: string
        }
        Update: {
          id?: number
          album_id?: number
          artist_id?: string
          vai_tro?: string
          ty_le_royalty?: number
          trang_thai?: string
          ngay_moi?: string | null
          ngay_chap_nhan?: string | null
          ghi_chu?: string | null
          ngay_tao?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_hop_tac_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_hop_tac_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      album_lich_su: {
        Row: {
          id: number
          album_id: number
          hanh_dong: string
          gia_tri_cu: Json | null
          gia_tri_moi: Json | null
          nguoi_thuc_hien: number | null
          ip_address: string | null
          user_agent: string | null
          ngay_tao: string
        }
        Insert: {
          id?: number
          album_id: number
          hanh_dong: string
          gia_tri_cu?: Json | null
          gia_tri_moi?: Json | null
          nguoi_thuc_hien?: number | null
          ip_address?: string | null
          user_agent?: string | null
          ngay_tao?: string
        }
        Update: {
          id?: number
          album_id?: number
          hanh_dong?: string
          gia_tri_cu?: Json | null
          gia_tri_moi?: Json | null
          nguoi_thuc_hien?: number | null
          ip_address?: string | null
          user_agent?: string | null
          ngay_tao?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_lich_su_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
      }
      artists: {
        Row: {
          id: string
          name: string
          slug: string
          bio: string | null
          avatar_url: string | null
          cover_image_url: string | null
          genre: string[] | null
          social_links: Json | null
          monthly_listeners: string | null
          followers: string | null
          total_streams: string | null
          top_chart: string | null
          verified: boolean | null
          is_active: boolean | null
          country: string | null
          city: string | null
          label: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          genre?: string[] | null
          social_links?: Json | null
          monthly_listeners?: string | null
          followers?: string | null
          total_streams?: string | null
          top_chart?: string | null
          verified?: boolean | null
          is_active?: boolean | null
          country?: string | null
          city?: string | null
          label?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          bio?: string | null
          avatar_url?: string | null
          cover_image_url?: string | null
          genre?: string[] | null
          social_links?: Json | null
          monthly_listeners?: string | null
          followers?: string | null
          total_streams?: string | null
          top_chart?: string | null
          verified?: boolean | null
          is_active?: boolean | null
          country?: string | null
          city?: string | null
          label?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      album_tag: {
        Row: {
          id: number
          album_id: number
          ten_tag: string
          loai_tag: string
          trang_thai: string
          ngay_tao: string
        }
        Insert: {
          id?: number
          album_id: number
          ten_tag: string
          loai_tag: string
          trang_thai?: string
          ngay_tao?: string
        }
        Update: {
          id?: number
          album_id?: number
          ten_tag?: string
          loai_tag?: string
          trang_thai?: string
          ngay_tao?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_tag_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
        ]
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
