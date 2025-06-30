import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { RoutingPageView } from '@/features/routing/components/routing-page-view';
import { authGuard } from '@/lib/utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map-override.css';

export const optionalSearchParams = z.object({
  startLocation: z.union([z.string(), z.undefined()]),
  startLocationCoordinates: z.union([
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    z.undefined(),
  ]),
  endLocation: z.union([z.string(), z.undefined()]),
  endLocationCoordinates: z.union([
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    z.undefined(),
  ]),
  vehicleId: z.union([z.string(), z.undefined()]),
  avoidToll: z.union([z.boolean(), z.undefined()]),
  routingMethod: z.union([z.enum(['safe', 'normal', 'risky']), z.undefined()]),
});

export type RoutingSearchParams = z.infer<typeof optionalSearchParams>;

export type SearchParamKeys = keyof z.infer<typeof optionalSearchParams>;

export const Route = createFileRoute('/routing/')({
  component: RouteComponent,
  validateSearch: optionalSearchParams,
  beforeLoad: async ({ location }) => await authGuard(location),
});

function RouteComponent() {
  return <RoutingPageView />;
}
