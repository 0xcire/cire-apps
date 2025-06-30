import { QueryClientProvider } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './react-query';
import { ThemeProvider } from '@cire/ui/components/theme-provider';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/error-boundary';
import type { ReactNode } from 'react';
import { router } from '@/main';

export function ApplicationProviders({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="koshi-theme">
          <Toaster />
          <TanStackRouterDevtools position="bottom-right" router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
