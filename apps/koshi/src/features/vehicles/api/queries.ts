import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getVehicles } from './methods';

const queryKey = 'vehicles';

export function useVehicles() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getVehicles,
    select: (data) => data.vehicles,
  });
}
