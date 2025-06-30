export interface GenerateRouteOpts {
  startLocation: string;
  endLocation: string;
  vehicleId: string;
  routingMethod?: string;
  avoidToll?: string;
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

export interface GenerateRouteResponse {
  routePolylineAsWkt: string;
  stations: Station[];
  meta: {
    secondsPerSegment: number[];
    metersPerSegment: number[];
  };
}
