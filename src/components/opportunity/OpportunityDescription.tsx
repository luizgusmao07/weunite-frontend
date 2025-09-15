import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  X as CloseIcon,
  MapPin,
  Calendar,
  Users,
  Clock,
  Building2,
} from "lucide-react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { OpportunityDisplay } from "@/@types/opportunity.types";
import { getTimeAgo } from "@/hooks/useGetTimeAgo";

interface OpportunityModalProps {
  opportunity: OpportunityDisplay;
  buttonText?: string;
  variant?: string;
  size?: string;
  className?: string;
}

export function OpportunityModal({
  opportunity,
  buttonText = "Ver Detalhes",
  variant,
  size,
  className,
}: OpportunityModalProps) {
  const { isDesktop, isTablet } = useBreakpoints();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const timeAgo = getTimeAgo(opportunity.createdAt);
  const updatedTimeAgo = opportunity.updatedAt
    ? getTimeAgo(opportunity.updatedAt)
    : null;
  const deadlineDate = new Date(opportunity.dateEnd).toLocaleDateString(
    "pt-BR",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <h4 className="text-base font-semibold">Empresa</h4>
        </div>
        <div className="flex items-center gap-3">
          {opportunity.companyLogo ? (
            <img
              src={opportunity.companyLogo}
              alt={opportunity.companyName}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-third/10 flex items-center justify-center border-2 border-border">
              <span className="text-third font-semibold text-lg">
                {opportunity.companyName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-card-foreground">
              {opportunity.companyName}
            </p>
            <p className="text-sm text-muted-foreground">
              ID: {opportunity.companyId}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Local:</span>
            <span className="font-medium">{opportunity.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Prazo:</span>
            <span className="font-medium">{deadlineDate}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Candidaturas:</span>
            <span className="font-medium">{opportunity.applicationsCount}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Publicado:</span>
            <span className="font-medium">{timeAgo}</span>
          </div>
        </div>

        {updatedTimeAgo && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">Atualizado:</span>
            <span className="font-medium">{updatedTimeAgo}</span>
          </div>
        )}
      </div>

      {opportunity.skills && opportunity.skills.length > 0 && (
        <div>
          <h4 className="text-base font-semibold mb-3 flex items-center gap-2">
            <span>Habilidades Requeridas</span>
            <Badge variant="outline" className="text-xs">
              {opportunity.skills.length}
            </Badge>
          </h4>
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="text-sm px-3 py-1 bg-third/10 text-third hover:bg-third/20"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Status: {opportunity.isExpired ? "Expirada" : "Ativa"}
            </p>
            <p className="text-xs text-muted-foreground">
              {opportunity.isExpired
                ? "Esta oportunidade não aceita mais candidaturas"
                : `${opportunity.daysUntilDeadline} dias restantes`}
            </p>
          </div>
          <Badge variant={opportunity.isExpired ? "destructive" : "default"}>
            {opportunity.isExpired ? "Expirada" : "Ativa"}
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="text-base font-semibold mb-3">Descrição Completa</h4>
        <div className="bg-muted/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {opportunity.description}
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div>
            <span className="font-medium">ID da Oportunidade:</span>{" "}
            {opportunity.id}
          </div>
          <div>
            <span className="font-medium">Criado em:</span>{" "}
            {new Date(opportunity.createdAt).toLocaleString("pt-BR")}
          </div>
          {opportunity.updatedAt && (
            <>
              <div>
                <span className="font-medium">Última atualização:</span>{" "}
                {new Date(opportunity.updatedAt).toLocaleString("pt-BR")}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (!isDesktop && isTablet) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant={(variant as any) || "outline"}
            size={(size as any) || "sm"}
            className={cn(
              "text-xs text-thrid bg-transparent hover:cursor-pointer",
              className,
            )}
          >
            {buttonText}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[90vh] data-[vaul-drawer-direction=bottom]:max-h-[90vh] mt-0 flex flex-col">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DrawerHeader className="pt-8 px-6 relative">
              <DrawerClose className="absolute rounded-sm transition-opacity right-4">
                <CloseIcon className="h-5 w-5 hover:cursor-pointer" />
              </DrawerClose>
              <DrawerTitle className="text-left text-xl font-bold">
                {opportunity.title}
              </DrawerTitle>
              <DrawerDescription className="text-left text-muted-foreground">
                {opportunity.location}
              </DrawerDescription>
            </DrawerHeader>

            <div className="px-6 mb-4 flex gap-2">
              <Button
                size="sm"
                variant="third"
                className="rounded-full px-4"
                disabled={opportunity.isExpired}
              >
                {opportunity.isExpired ? "Expirada" : "Candidatar-se"}
              </Button>

              <Button size="sm" variant="outline" className="rounded-full px-4">
                Salvar
              </Button>
            </div>

            <div className="px-6 pb-6">{renderContent()}</div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={(variant as any) || "outline"}
          size={(size as any) || "sm"}
          className={cn(
            "text-xs text-thrid bg-transparent hover:cursor-pointer",
            className,
          )}
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {opportunity.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {opportunity.location}
            </DialogDescription>
          </DialogHeader>

          <div className="mb-6 flex gap-2">
            <Button
              size="sm"
              variant="third"
              className="rounded-full px-6"
              disabled={opportunity.isExpired}
            >
              {opportunity.isExpired
                ? "Oportunidade Expirada"
                : "Candidatar-se"}
            </Button>

            <Button size="sm" variant="outline" className="rounded-full px-4">
              Salvar
            </Button>
          </div>

          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
