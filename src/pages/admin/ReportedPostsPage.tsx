import { useState } from "react";
import { ReportDetailsModal } from "@/components/admin/ReportDetailsModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { FileText, Flag, Heart, Search, Image } from "lucide-react";
import type { Post } from "@/@types/post.types";
import type { Report } from "@/@types/admin.types";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MOCK_REPORTERS, MOCK_REPORT_REASONS } from "@/constants/adminMockData";

/**
 * Página de gerenciamento de posts
 */
export function ReportedPostsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dados mockados - substituir por API real quando o backend estiver pronto
  const mockPosts: Post[] = [
    {
      id: "1",
      text: "Acabei de concluir meu projeto de redesign do dashboard...",
      imageUrl:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: "1",
        name: "Silva",
        username: "silva.dev",
        email: "silva@example.com",
        password: "",
        role: "athlete" as const,
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Silva",
      },
      likes: Array(142).fill(null),
      comments: Array(28).fill(null),
    },
    {
      id: "2",
      text: "Compartilhando minha experiência migrando um projeto legacy para React...",
      imageUrl: null,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: "2",
        name: "Carlos Mendes",
        username: "carlos.mendes",
        email: "carlos@example.com",
        password: "",
        role: "athlete" as const,
        profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      },
      likes: Array(289).fill(null),
      comments: Array(56).fill(null),
    },
  ];

  const handleReviewPost = (post: Post) => {
    // Converter post para formato de report com dados aleatórios
    const randomReporter =
      MOCK_REPORTERS[Math.floor(Math.random() * MOCK_REPORTERS.length)];
    const randomReason =
      MOCK_REPORT_REASONS[
        Math.floor(Math.random() * MOCK_REPORT_REASONS.length)
      ];

    const report: Report = {
      id: post.id,
      reportedBy: randomReporter,
      reportedUser: {
        name: post.user.name,
        username: post.user.username,
      },
      reason: randomReason.id,
      description: `Post reportado por ${randomReason.label.toLowerCase()}. O conteúdo viola as diretrizes da comunidade.`,
      status: "pending",
      createdAt: post.createdAt,
      content: post.text,
      imageUrl: post.imageUrl || undefined,
    };
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const getTimeAgoSimple = (date: string) => {
    const hours = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60),
    );
    return `${hours} horas atrás`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold">Posts Denunciados</h1>
          <p className="text-muted-foreground">
            Gerencie e modere posts reportados pelos usuários
          </p>
        </div>
        {/* Cards de Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Posts Denunciados
              </CardTitle>
              <Flag className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Requerem atenção</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Aguardando revisão
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Denúncias
              </CardTitle>
              <Heart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                Denúncias recebidas
              </p>
            </CardContent>
          </Card>
        </div>{" "}
        {/* Seção de Gerenciamento */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Denunciados</CardTitle>
            <p className="text-sm text-muted-foreground">
              Revise e tome ações sobre posts reportados pelos usuários
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filtros */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar posts denunciados por autor ou conteúdo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="reviewed">Revisado</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabela de Posts */}
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead>Denúncias</TableHead>
                    <TableHead>Engajamento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPosts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        Nenhum post denunciado no momento
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="max-w-md">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {post.user.name}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {post.text}
                            </p>
                            {post.imageUrl && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Image className="h-3 w-3" />
                                <span>Com mídia</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="bg-red-600">
                            {Math.floor(Math.random() * 10) + 1} denúncias
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-red-500" />
                              <span>{post.likes.length}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>💬</span>
                              <span>{post.comments.length}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-yellow-500 text-yellow-600"
                          >
                            Pendente
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {getTimeAgoSimple(post.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReviewPost(post)}
                          >
                            Revisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <ReportDetailsModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          report={selectedReport}
        />
      </div>
    </AdminLayout>
  );
}
