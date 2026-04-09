"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import type { ReactNode } from "react";
import { useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "!bg-gray-900 !text-white !border !border-white/10 !shadow-xl",
            duration: 3000,
            style: {
              background: "rgb(17, 24, 39)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
