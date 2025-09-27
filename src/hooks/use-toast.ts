import { useState } from "react";

interface ToastProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

export function toast({ title, description }: ToastProps) {
  console.log(`Toast: ${title} - ${description}`);
  // Simple implementation for now
}

export const useToast = () => ({
  toast,
});
