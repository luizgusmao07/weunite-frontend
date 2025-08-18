import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { X as CloseIcon } from "lucide-react";
import { Input } from "../ui/input";
import CardFollowing from "./CardFollowing";
import { useBreakpoints } from "@/hooks/useBreakpoints";

interface FollowingProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function Following({ isOpen, onOpenChange }: FollowingProps) {
  const { isDesktop, isTablet} = useBreakpoints();


  if (!isDesktop && isTablet) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[100vh] data-[vaul-drawer-direction=bottom]:max-h-[100vh] mt-0">
          <DrawerHeader className="pt-8 px-6 relative">
            <DrawerClose className="absolute rounded-sm transition-opacity right-4">
              <CloseIcon className="h-5 w-5 hover:cursor-pointer" />
            </DrawerClose>
            <DrawerTitle className="mb-4">Seguindo</DrawerTitle>
            <div className="relative">
              <Input placeholder="Pesquisar..." />
            </div>
          </DrawerHeader>
          <div
            className="flex flex-col overflow-y-auto px-2 pt-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "transparent transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.scrollbarColor =
                "rgba(0,0,0,0.3) transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.scrollbarColor = "transparent transparent";
            }}
          >
            <CardFollowing />
            <CardFollowing />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="h-[80vh] w-[70vw] xl:max-w-[50vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>Seguindo</DialogTitle>
          <DialogClose />
          <div className="relative">
            <Input placeholder="Pesquisar..." />
          </div>
        </DialogHeader>
        <div
          className="flex flex-col flex-1 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.scrollbarColor =
              "rgba(0,0,0,0.3) transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.scrollbarColor = "transparent transparent";
          }}
        >
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
          <CardFollowing />
        </div>
      </DialogContent>
    </Dialog>
  );
}