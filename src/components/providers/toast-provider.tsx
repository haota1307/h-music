"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      expand={true}
      theme="dark"
      closeButton
      toastOptions={{
        style: {
          backgroundColor: "hsl(var(--card))",
          borderColor: "hsl(var(--border))",
          color: "hsl(var(--card-foreground))",
        },
        className: "my-toast",
      }}
    />
  );
}
