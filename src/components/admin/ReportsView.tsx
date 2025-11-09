import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, FileText, Briefcase, Search } from "lucide-react";
import { ReportDetailsModal } from "./ReportDetailsModal";
import type { Report } from "@/@types/admin.types";
import {
  getReportStatusBadge,
  getReportReasonBadge,
} from "@/utils/adminBadges";

// Mock data simplificado - usar tipos corretos
// TODO: Substituir por dados reais da API
const mockReportsData: Report[] = [
  {
    id: "1",
    entityId: 123,
    entityType: "POST",
    reportedBy: { name: "Maria Silva", username: "mariasilva" },
    reportedUser: { name: "Pedro Lima", username: "pedrolima" },
    reason: "inappropriate_content",
    description: "O post contém linguagem ofensiva e ataca outros usuários",
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    content: "Post com conteúdo inapropriado...",
  },
  {
    id: "2",
    entityId: 456,
    entityType: "POST",
    reportedBy: { name: "Ana Costa", username: "anacosta" },
    reportedUser: { name: "Carlos Santos", username: "carlossantos" },
    reason: "harassment",
    description: "Usuário enviou mensagens ofensivas repetidamente",
    status: "under_review",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    content: "Mensagens de assédio...",
  },
  {
    id: "3",
    entityId: 789,
    entityType: "OPPORTUNITY",
    reportedBy: { name: "João Oliveira", username: "joaooliveira" },
    reportedUser: { name: "Empresa Falsa", username: "empresafalsa" },
    reason: "fake_opportunity",
    description: "Vaga solicita pagamento antecipado, parece ser golpe",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    content: "Vaga de desenvolvedor com pagamento antecipado...",
  },
];

const typeLabels: Record<string, string> = {
  POST: "Post",
  OPPORTUNITY: "Oportunidade",
};

export function ReportsView() {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredReports = mockReportsData.filter((report) => {
    const matchesType =
      filterType === "all" || report.entityType === filterType;
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesSearch =
      report.reportedUser.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.reportedBy.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  const pendingCount = mockReportsData.filter(
    (r) => r.status === "pending",
  ).length;
  const underReviewCount = mockReportsData.filter(
    (r) => r.status === "under_review",
  ).length;
  const highSeverityCount = pendingCount + underReviewCount; // Simplificado

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Denúncias Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <h3>{pendingCount}</h3>
            <p className="text-muted-foreground mt-1">Aguardando revisão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Em Análise</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <h3>{underReviewCount}</h3>
            <p className="text-muted-foreground mt-1">Sendo revisadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Alta Severidade</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <h3>{highSeverityCount}</h3>
            <p className="text-muted-foreground mt-1">
              Requerem atenção urgente
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Denúncias</CardTitle>
          <CardDescription>
            Revise e tome ações sobre denúncias recebidas
          </CardDescription>

          <div className="flex gap-4 pt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar denúncias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="POST">Posts</SelectItem>
                <SelectItem value="OPPORTUNITY">Oportunidades</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="under_review">Em análise</SelectItem>
                <SelectItem value="resolved">Resolvida</SelectItem>
                <SelectItem value="dismissed">Rejeitada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Denunciado</TableHead>
                <TableHead>Denunciado por</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="w-[100px]">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    Nenhuma denúncia encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {report.entityType === "POST" && (
                          <FileText className="h-4 w-4 text-muted-foreground" />
                        )}
                        {report.entityType === "OPPORTUNITY" && (
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{typeLabels[report.entityType]}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {report.reportedUser.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {report.reportedUser.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @{report.reportedUser.username}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {report.reportedBy.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{report.reportedBy.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getReportReasonBadge(report.reason)}</TableCell>
                    <TableCell>{getReportStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(report.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReportClick(report)}
                      >
                        Revisar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ReportDetailsModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        report={selectedReport}
      />
    </div>
  );
}
