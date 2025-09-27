import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  MapPin,
  Calendar,
  Users,
  EllipsisVertical,
  Edit,
  Trash2,
  Flag,
  Bookmark,
  Eye,
} from "lucide-react";
import type { Opportunity } from "@/@types/opportunity.types";
import { getTimeAgo } from "@/hooks/useGetTimeAgo";
import { getInitials } from "@/utils/getInitials";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { EditOpportunity } from "../shared/EditOpportunity";
// import { OpportunityDescription } from "./OpportunityDescription";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { user } = useAuthStore();
  const initials = getInitials(opportunity.company?.name || "");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isOwner = opportunity.company?.id === Number(user?.id); // Ajustar conforme a estrutura

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    // TODO: Implementar delete
    setIsDeleteDialogOpen(false);
  };

  const handleView = () => {
    setIsDescriptionOpen(true);
  };

  const opportunityDate = new Date(opportunity.dateEnd).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );

  return (
    <>
      {/* <OpportunityDescription
        isOpen={isDescriptionOpen}
        onOpenChange={setIsDescriptionOpen}
        opportunity={opportunity}
      /> */}

      <EditOpportunity
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        opportunity={opportunity}
      />

      <Card className="w-full max-w-[45em] bg-red shadow-none border-0 border-b rounded-none border-foreground/50">
        <CardHeader className="flex flex-row items-center gap-2 mb-[0.5em]">
          <Avatar className="hover:cursor-pointer h-[2.8em] w-[2.8em]">
            <AvatarImage src={opportunity.company?.logo} alt="company logo" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-base font-medium hover:cursor-pointer">
              {opportunity.company?.name}
            </CardTitle>
            <CardDescription className="text-xs">
              Publicado há {getTimeAgo(opportunity.createdAt)}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical className="ml-auto h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {isOwner ? (
                <>
                  <DropdownMenuItem
                    onClick={handleEdit}
                    className="hover:cursor-pointer"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>

                  <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onSelect={(e) => {
                          e.preventDefault();
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. A oportunidade será
                          permanentemente removida da plataforma.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <Flag className="mr-2 h-4 w-4" />
                    Denunciar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="w-full mt-[-18px]">
          <CardTitle className="text-lg font-semibold mb-2">
            {opportunity.title}
          </CardTitle>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {opportunity.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {opportunity.skills?.slice(0, 3).map((skill) => (
              <Badge key={skill.id} variant="secondary" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {opportunity.skills && opportunity.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{opportunity.skills.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {opportunity.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {opportunityDate}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {opportunity.subscribers?.length || 0} candidatos
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col mt-[-20px]">
          <div className="flex w-full justify-between">
            <CardAction
              className="flex items-center gap-3 hover:cursor-pointer"
              onClick={handleView}
            >
              <Eye className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Ver detalhes</span>
            </CardAction>

            <CardAction className="flex items-center gap-2 hover:cursor-pointer">
              <Bookmark className="h-5 w-5 text-muted-foreground" />
            </CardAction>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
