import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useOps } from "@/lib/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void Promise.resolve(useOps.persist.rehydrate()).then(() => {
      useOps.getState().markHydrated();
      useOps.getState().tickFocusDay();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "bg-surface text-fg shadow-card border-0",
              title: "text-fg",
              description: "text-muted",
            },
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
