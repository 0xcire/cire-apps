import { useMutation, useQuery } from '@tanstack/react-query';
import { generateRoute, saveRoute } from './methods';

import type { GenerateRouteOpts } from './types';

export function useGenerateRoute(opts: Partial<GenerateRouteOpts>) {
  return useQuery({
    queryKey: [JSON.stringify(opts)],
    queryFn: () => generateRoute(opts),
    enabled: false,
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useSaveRoute() {
  return useMutation({
    mutationFn: saveRoute,
  });
}
