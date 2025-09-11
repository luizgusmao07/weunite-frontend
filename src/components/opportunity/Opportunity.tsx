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
import { X as CloseIcon } from "lucide-react";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useState, useEffect } from "react";

interface OpportunityModalProps {
  title: string;
  address: string;
  fullDescription?: string;
  buttonText?: string;
  userPhoto?: string;
  userName?: string;
  date?: string;
}

export function OpportunityModal({
  title,
  address,
  fullDescription,
  buttonText = "Ver Mais",
  userPhoto,
  userName,
  date
}: OpportunityModalProps) {
  const { isDesktop, isTablet } = useBreakpoints();
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const renderContent = () => (
    <div className="space-y-4">
      {fullDescription && (
        <div>
          <h4 className="text-base font-semibold mb-2">Descrição Oportunidade</h4>
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            {fullDescription}
          </p>
        </div>
      )}
    </div>
  );

  if (!isDesktop && isTablet) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-thrid bg-transparent hover:cursor-pointer"
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
              <div className="flex items-center gap-3 mb-4">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={userName || "Foto do usuário"}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                    <span className="text-gray-600 font-semibold text-lg">
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                )}
                {userName && (
                  <div className="flex-1">
                    <p className="text-left font-medium">
                      {userName}
                    </p>
                  </div>
                )}
              </div>
              <DrawerTitle className="text-left">{title}</DrawerTitle>
              <DrawerDescription className="text-left">
                {address}
              </DrawerDescription>
            </DrawerHeader>

            <DrawerDescription className="px-6 mb-3 text-left">
              {date}
            </DrawerDescription>
          
            <div className="px-6 mb-4">
              <Button
                size="sm"
                className="rounded-full w-[7em]"
              >
                Habilidades
              </Button>
            </div>

            <div className="px-6 mb-4 flex gap-2">
              <Button
                size="sm"
                variant="third"
                className="rounded-full w-[9em]"
              >
                Inscrever-se
              </Button>

              <Button
                size="sm"
                className="rounded-full w-[7em]"
              >
                Salvar
              </Button>
            </div>

            <div className="px-6 pb-6">
              {renderContent()}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-xs text-thrid bg-transparent hover:cursor-pointer"
        >
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="space-y-4">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt={userName || "Foto do usuário"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-gray-600 font-semibold text-base">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
              )}
              {userName && (
                <div className="flex-1">
                  <p className="text-base font-medium">
                    {userName}
                  </p>
                </div>
              )}
            </div>

            <DialogTitle className="text-lg">{title}</DialogTitle>
            <DialogDescription className="text-sm">
              {address}
            </DialogDescription>

            <DrawerDescription className=" mb-3 text-left">
              {date}
            </DrawerDescription>

          </DialogHeader>

          <div className="mb-4">
            <Button
              size="sm"
              className="rounded-full px-4"
            >
              Habilidades
            </Button>
          </div>

          <div className="mb-4 flex gap-2">
            <Button
              size="sm"
              variant="third"
              className="rounded-full px-4"
            >
              Inscrever-se
            </Button>

            <Button
              size="sm"
              className="rounded-full px-4"
            >
              Salvar
            </Button>
          </div>

          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}