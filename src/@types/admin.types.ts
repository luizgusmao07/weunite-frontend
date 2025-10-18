export interface AdminStats {
  totalPosts: number;
  totalOpportunities: number;
  activeUsers: number;
  engagementRate: number;
  previousMonth: {
    totalPosts: number;
    totalOpportunities: number;
    activeUsers: number;
    engagementRate: number;
  };
}

export interface ChartDataPoint {
  month: string;
  posts: number;
  opportunities: number;
}

export interface CategoryData {
  category: string;
  count: number;
  fill: string;
}

export interface UserTypeData {
  name: string;
  value: number;
  [key: string]: any; // Para compatibilidade com recharts
}

export interface ChartColors {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  danger: string;
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

// Tipos para gerenciamento de denúncias
export interface PostReport {
  id: string;
  postId: string;
  reportedBy: string;
  reason: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface ReportedPost {
  post: any; // Pode usar o tipo Post do post.types.ts
  reports: PostReport[];
  totalReports: number;
  status: "pending" | "hidden" | "deleted";
}

export interface ModerationAction {
  action: "hide" | "delete" | "dismiss";
  postId: string;
  reason?: string;
}

/**
 * Interface para denúncias reportadas
 */
export interface Report {
  id: string;
  reportedBy: {
    name: string;
    username: string;
  };
  reportedUser: {
    name: string;
    username: string;
  };
  reason: string;
  description: string;
  status: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}
