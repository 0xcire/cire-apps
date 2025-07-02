import type { Vehicle } from '@/features//vehicles/api/methods';
import type { User } from 'better-auth/types';

export interface GenerateRouteOpts {
  startLocation: string;
  endLocation: string;
  vehicleId: string;
  routingMethod?: string;
  avoidToll?: boolean;
}

export interface Station {
  id: number;
  accessCode: string;
  accessDaysTime: string;
  accessDetailCode?: string;
  cardsAccepted?: string;
  dateLastConfirmed?: string;
  expectedDate?: string;
  fuelTypeCode: string;
  maximum_VehicleClass?: string;
  openDate?: string;
  ownerTypeCode?: string;
  restrictedAccess: boolean;
  statusCode: string;
  facilityType?: string;
  stationName: string;
  stationPhone?: string;
  updatedAt: Date;
  geocodeStatus: string;
  city: string;
  state: string;
  country: string;
  streetAddress: string;
  zip?: string;
  plus4?: string;
  intersectionDirections?: string;
  e85blenderPump: boolean;
  e85OtherEthanolBlends?: string[];
  point: {
    latitude: number;
    longitude: number;
  };
}

export interface Route {
  id: string;
  originLocation: string;
  endLocation: string;
  routingMethod: string;
  avoidToll: boolean;
  appxRouteLinestring: string;
  startedAt?: Date;
  endedAt?: Date;
  appxRouteLengthInMeters: number;
  appxRouteLengthInSeconds: number;
  realDistanceTraveled: number;
  realTimeSpent: number;
  user: User; // ?
  vehicle: Vehicle;
  stations: Station[];
}

export interface GenerateRouteResponse {
  routePolylineAsWkt: string;
  stations: Station[];
  meta: {
    secondsPerSegment: number[];
    metersPerSegment: number[];
  };
}

export interface SaveRouteOpts {
  startLocation: string;
  endLocation: string;
  vehicleId: string;
  stationIds: number[];
  appxRouteLineString: string;
  appxRouteLengthInMeters: number;
  appxRouteLengthInSeconds: number;
  routingMethod?: string;
  avoidToll?: boolean;
}

export interface SaveRouteResponse {
  route: Route;
}
