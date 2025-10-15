import type {
  AdminStats,
  ChartDataPoint,
  UserTypeData,
} from "@/@types/admin.types";

/**
 * Dados mock para estatísticas do dashboard admin
 * TODO: Substituir por dados reais da API
 */
export const MOCK_ADMIN_STATS: AdminStats = {
  totalPosts: 3842,
  totalOpportunities: 1245,
  activeUsers: 12458,
  engagementRate: 68.4,
  previousMonth: {
    totalPosts: 3432,
    totalOpportunities: 1145,
    activeUsers: 10842,
    engagementRate: 65.1,
  },
};

/**
 * Dados mock para atividade mensal
 * TODO: Substituir por dados reais da API
 */
export const MOCK_MONTHLY_DATA: ChartDataPoint[] = [
  { month: "Jan", posts: 150, opportunities: 45 },
  { month: "Fev", posts: 280, opportunities: 65 },
  { month: "Mar", posts: 200, opportunities: 55 },
  { month: "Abr", posts: 300, opportunities: 75 },
  { month: "Mai", posts: 250, opportunities: 85 },
  { month: "Jun", posts: 400, opportunities: 95 },
];

/**
 * Dados mock para tipos de usuário
 * TODO: Substituir por dados reais da API
 */
export const MOCK_USER_TYPE_DATA: UserTypeData[] = [
  { name: "Atletas", value: 8500 },
  { name: "Empresas", value: 3958 },
];
