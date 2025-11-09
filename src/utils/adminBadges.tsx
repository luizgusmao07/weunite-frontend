import { Badge } from "@/components/ui/badge";

/**
 * Utilitários para renderizar badges no painel administrativo
 * Centraliza a lógica de badges para evitar duplicação
 */

// Tipos de status
type UserStatus = "active" | "suspended" | "banned";
type ReportStatus = "pending" | "under_review" | "resolved" | "dismissed";

// Mapeamentos de texto
export const reportReasonMap: Record<string, string> = {
  spam: "Spam",
  harassment: "Assédio",
  inappropriate_content: "Conteúdo Inadequado",
  fake_profile: "Perfil Falso",
  fake_opportunity: "Oportunidade Falsa",
  copyright_violation: "Violação de Direitos",
  other: "Outros",
};

export const reportStatusMap: Record<ReportStatus, string> = {
  pending: "Pendente",
  under_review: "Em Análise",
  resolved: "Resolvido",
  dismissed: "Rejeitado",
};

export const userStatusMap: Record<UserStatus, string> = {
  active: "Ativo",
  suspended: "Suspenso",
  banned: "Banido",
};

/**
 * Renderiza badge de status de usuário
 */
export function getUserStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          {userStatusMap.active}
        </Badge>
      );
    case "suspended":
      return <Badge variant="destructive">{userStatusMap.suspended}</Badge>;
    case "banned":
      return <Badge variant="destructive">{userStatusMap.banned}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

/**
 * Renderiza badge de role/tipo de usuário
 */
export function getUserRoleBadge(role: string) {
  return role === "company" ? (
    <Badge variant="outline" className="bg-blue-50 text-blue-700">
      Empresa
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-purple-50 text-purple-700">
      Atleta
    </Badge>
  );
}

/**
 * Renderiza badge de status de denúncia/report
 */
export function getReportStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="destructive"
          className="bg-red-600 text-white hover:bg-red-700"
        >
          {reportStatusMap.pending}
        </Badge>
      );
    case "under_review":
      return (
        <Badge
          variant="outline"
          className="border-blue-500 text-blue-600 bg-blue-50"
        >
          {reportStatusMap.under_review}
        </Badge>
      );
    case "resolved":
      return (
        <Badge
          variant="outline"
          className="border-green-500 text-green-600 bg-green-50"
        >
          {reportStatusMap.resolved}
        </Badge>
      );
    case "dismissed":
      return <Badge variant="secondary">{reportStatusMap.dismissed}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

/**
 * Renderiza badge de motivo de denúncia
 */
export function getReportReasonBadge(reason: string) {
  const reasonText = reportReasonMap[reason] || reason;
  return <Badge variant="outline">{reasonText}</Badge>;
}

/**
 * Retorna apenas o texto do motivo da denúncia (sem badge)
 */
export function getReportReasonText(reason: string): string {
  return reportReasonMap[reason] || reason;
}
