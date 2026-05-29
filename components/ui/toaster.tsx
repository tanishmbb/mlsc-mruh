"use client"

import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast
          key={id}
          {...props}
          className="bg-card border border-border shadow-xl backdrop-blur-md"
        >
          <div className="grid gap-1">
            {title && (
              <ToastTitle className="text-foreground">
                {title}
              </ToastTitle>
            )}
            {description && (
              <ToastDescription className="text-muted-foreground">
                {description}
              </ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport className="fixed top-4 right-4 z-[100] flex flex-col gap-2" />
    </ToastProvider>
  )
}
