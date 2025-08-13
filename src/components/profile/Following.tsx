
import {
    Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { X as CloseIcon } from "lucide-react";
import { Input } from "../ui/input";

interface FollowingProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function Following({ isOpen, onOpenChange }: FollowingProps) {
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
        
      </DrawerContent>
    </Drawer>
  );
}
