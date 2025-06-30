import { useQuery } from '@tanstack/react-query';
import { getRoute } from './methods';

import type { GenerateRouteOpts } from './types';

export function useGetRoute(opts: Partial<GenerateRouteOpts>) {
  return useQuery({
    queryKey: [JSON.stringify(opts)],
    queryFn: () => getRoute(opts),
    enabled: false,
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
