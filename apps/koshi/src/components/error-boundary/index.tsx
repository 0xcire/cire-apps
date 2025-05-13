import { ErrorBoundary as ErrorBoundaryWrapper } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "@cire/ui/components/button";
import { Typography } from "@cire/ui/components/typography";

import type { ErrorInfo, PropsWithChildren, ReactNode } from "react";

type ErrorBoundaryProps = PropsWithChildren;
type ErrorProps = {
  resetErrorBoundary: () => void;
};

function logError(error: Error, info: ErrorInfo) {
  console.log("[ErrorBoundary Error]", error);
  console.log("[ErrorBoundary Component Stack]", info.componentStack);
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundaryWrapper
      onReset={reset}
      onError={logError}
      fallbackRender={({ resetErrorBoundary }): ReactNode => (
        <Error resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
}

function Error({ resetErrorBoundary }: ErrorProps) {
  return (
    <div className="grid h-screen w-full place-items-center">
      <div>
        <Typography variant="h3">Uh Oh! Something went wrong.</Typography>
        <Button className="mt-4" onClick={(): void => resetErrorBoundary()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
