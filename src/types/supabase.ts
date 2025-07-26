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
      accounts: {
        Row: {
          id: string
          userId: string
          type: string
          provider: string
          providerAccountId: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          userId: string
          type: string
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          userId?: string
          type?: string
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          sessionToken: string
          userId: string
          expires: string
        }
        Insert: {
          id?: string
          sessionToken: string
          userId: string
          expires: string
        }
        Update: {
          id?: string
          sessionToken?: string
          userId?: string
          expires?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          emailVerified: string | null
          image: string | null
          password: string | null
          role: UserRole
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          role?: UserRole
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          emailVerified?: string | null
          image?: string | null
          password?: string | null
          role?: UserRole
          createdAt?: string
          updatedAt?: string
        }
      }
      verification_tokens: {
        Row: {
          identifier: string
          token: string
          expires: string
        }
        Insert: {
          identifier: string
          token: string
          expires: string
        }
        Update: {
          identifier?: string
          token?: string
          expires?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          color: string | null
          order: number
          isActive: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          color?: string | null
          order?: number
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          color?: string | null
          order?: number
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          color: string | null
          isActive: boolean
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          color?: string | null
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          color?: string | null
          isActive?: boolean
          createdAt?: string
          updatedAt?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          status: PostStatus
          publishedAt: string | null
          metaTitle: string | null
          metaDescription: string | null
          metaKeywords: string[]
          ogImage: string | null
          authorId: string
          categoryId: string | null
          viewCount: number
          commentCount: number
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          status?: PostStatus
          publishedAt?: string | null
          metaTitle?: string | null
          metaDescription?: string | null
          metaKeywords?: string[]
          ogImage?: string | null
          authorId: string
          categoryId?: string | null
          viewCount?: number
          commentCount?: number
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          status?: PostStatus
          publishedAt?: string | null
          metaTitle?: string | null
          metaDescription?: string | null
          metaKeywords?: string[]
          ogImage?: string | null
          authorId?: string
          categoryId?: string | null
          viewCount?: number
          commentCount?: number
          createdAt?: string
          updatedAt?: string
        }
      }
      post_tags: {
        Row: {
          postId: string
          tagId: string
        }
        Insert: {
          postId: string
          tagId: string
        }
        Update: {
          postId?: string
          tagId?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          status: CommentStatus
          postId: string
          authorId: string | null
          parentId: string | null
          guestName: string | null
          guestEmail: string | null
          ipAddress: string | null
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          content: string
          status?: CommentStatus
          postId: string
          authorId?: string | null
          parentId?: string | null
          guestName?: string | null
          guestEmail?: string | null
          ipAddress?: string | null
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          content?: string
          status?: CommentStatus
          postId?: string
          authorId?: string | null
          parentId?: string | null
          guestName?: string | null
          guestEmail?: string | null
          ipAddress?: string | null
          createdAt?: string
          updatedAt?: string
        }
      }
      file_uploads: {
        Row: {
          id: string
          filename: string
          originalName: string
          mimeType: string
          size: number
          path: string
          url: string | null
          category: FileCategory
          description: string | null
          version: string | null
          isPublic: boolean
          uploaderId: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          filename: string
          originalName: string
          mimeType: string
          size: number
          path: string
          url?: string | null
          category?: FileCategory
          description?: string | null
          version?: string | null
          isPublic?: boolean
          uploaderId: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          filename?: string
          originalName?: string
          mimeType?: string
          size?: number
          path?: string
          url?: string | null
          category?: FileCategory
          description?: string | null
          version?: string | null
          isPublic?: boolean
          uploaderId?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      post_uploads: {
        Row: {
          postId: string
          fileId: string
        }
        Insert: {
          postId: string
          fileId: string
        }
        Update: {
          postId?: string
          fileId?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          type: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          type?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          type?: string
          createdAt?: string
          updatedAt?: string
        }
      }
      visitor_logs: {
        Row: {
          id: string
          ipAddress: string
          userAgent: string | null
          referer: string | null
          path: string
          timestamp: string
        }
        Insert: {
          id?: string
          ipAddress: string
          userAgent?: string | null
          referer?: string | null
          path: string
          timestamp?: string
        }
        Update: {
          id?: string
          ipAddress?: string
          userAgent?: string | null
          referer?: string | null
          path?: string
          timestamp?: string
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
      UserRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
      PostStatus: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
      CommentStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SPAM'
      FileCategory: 'DOCUMENT' | 'PROGRAM' | 'IMAGE' | 'SPREADSHEET' | 'PRESENTATION' | 'ARCHIVE' | 'OTHER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type UserRole = Database['public']['Enums']['UserRole']
export type PostStatus = Database['public']['Enums']['PostStatus']
export type CommentStatus = Database['public']['Enums']['CommentStatus']
export type FileCategory = Database['public']['Enums']['FileCategory']