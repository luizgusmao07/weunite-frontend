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
