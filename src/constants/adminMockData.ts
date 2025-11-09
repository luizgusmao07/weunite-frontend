import type {
  AdminStats,
  ChartDataPoint,
  UserTypeData,
  Report,
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

/**
 * Dados mock para usuários
 * TODO: Substituir por dados reais da API
 */
export const MOCK_USERS = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    username: "joaosilva",
    role: "athlete",
    status: "active",
    lastLogin: "2024-10-15",
    postCount: 23,
    reportCount: 0,
  },
  {
    id: "2",
    name: "Tech Solutions Ltd",
    email: "contato@techsolutions.com",
    username: "techsolutions",
    role: "company",
    status: "active",
    lastLogin: "2024-10-14",
    postCount: 15,
    reportCount: 1,
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@email.com",
    username: "mariasantos",
    role: "athlete",
    status: "suspended",
    lastLogin: "2024-10-10",
    postCount: 8,
    reportCount: 3,
  },
];

/**
 * Dados mock para denúncias/reports
 * TODO: Substituir por dados reais da API
 */
export const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    reportedBy: { name: "João Silva", username: "joaosilva" },
    reportedUser: { name: "Pedro Lima", username: "pedrolima" },
    reason: "harassment",
    description: "Usuário enviando mensagens ofensivas",
    status: "pending",
    createdAt: "2024-10-15",
    content: "Post ofensivo sobre....",
    entityId: 123,
    entityType: "POST",
  },
  {
    id: "2",
    reportedBy: { name: "Maria Santos", username: "mariasantos" },
    reportedUser: { name: "Tech Corp", username: "techcorp" },
    reason: "fake_opportunity",
    description: "Oportunidade falsa publicada pela empresa",
    status: "under_review",
    createdAt: "2024-10-14",
    content: "Vaga de desenvolvedor com salário irreal",
    entityId: 456,
    entityType: "OPPORTUNITY",
  },
  {
    id: "3",
    reportedBy: { name: "Carlos Oliveira", username: "carlosoliveira" },
    reportedUser: { name: "Ana Costa", username: "anacosta" },
    reason: "spam",
    description: "Múltiplas publicações repetitivas",
    status: "resolved",
    createdAt: "2024-10-13",
    content: "Spam sobre curso online",
    entityId: 789,
    entityType: "POST",
  },
];

/**
 * Dados mock para denunciantes
 * TODO: Substituir por dados reais da API
 */
export const MOCK_REPORTERS = [
  { name: "Maria Santos", username: "maria.santos" },
  { name: "João Silva", username: "joao.silva" },
  { name: "Ana Costa", username: "ana.costa" },
  { name: "Pedro Oliveira", username: "pedro.oliveira" },
];

/**
 * Dados mock para motivos de denúncia
 * TODO: Substituir por dados reais da API
 */
export const MOCK_REPORT_REASONS = [
  { id: "inappropriate_content", label: "Conteúdo Inadequado" },
  { id: "harassment", label: "Assédio" },
  { id: "spam", label: "Spam" },
  { id: "fake_profile", label: "Perfil Falso" },
];
