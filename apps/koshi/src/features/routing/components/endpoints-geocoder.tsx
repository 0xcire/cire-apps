import { useSearch } from '@tanstack/react-router';
import { useMap } from 'react-map-gl/mapbox';
import { Geocoder } from '@mapbox/search-js-react';

import { Button } from '@cire/ui/components/button';

import type { SearchParamKeys } from '@/routes/routing';

export function EndpointsGeocoder({
  updateSearch,
}: {
  updateSearch: (searchKey: SearchParamKeys, value: unknown) => void;
}) {
  const { startLocation, endLocation } = useSearch({
    from: '/routing/',
  });

  const map = useMap();
  const mapRef = map.routing_map?.getMap();

  return (
    <div className="flex flex-col gap-2">
      <Geocoder
        accessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
        options={{
          language: 'en',
          country: 'US',
        }}
        map={mapRef}
        value={startLocation}
        onRetrieve={(res) => {
          updateSearch('startLocationCoordinates', res.properties.coordinates);
          updateSearch('startLocation', res.properties.full_address);
        }}
        onClear={() => {
          updateSearch('startLocationCoordinates', undefined);
          updateSearch('startLocation', undefined);
        }}
        onSuggestError={(error) =>
          console.log('[Geocoder Suggestion Error]', error)
        }
      />
      <Geocoder
        accessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
        options={{
          language: 'en',
          country: 'US',
        }}
        map={mapRef}
        placeholder="End location"
        value={endLocation}
        onRetrieve={(res) => {
          updateSearch('endLocationCoordinates', res.properties.coordinates);
          updateSearch('endLocation', res.properties.full_address);
        }}
        onClear={() => {
          updateSearch('endLocationCoordinates', undefined);
          updateSearch('endLocation', undefined);
        }}
        onSuggestError={(error) =>
          console.log('[Geocoder Suggestion Error]', error)
        }
      />
      <Button
        onClick={() => {
          updateSearch('startLocationCoordinates', undefined);
          updateSearch('startLocation', undefined);

          updateSearch('endLocationCoordinates', undefined);
          updateSearch('endLocation', undefined);

          updateSearch('vehicleId', undefined);
        }}
        variant="outline"
        className="ml-auto cursor-pointer"
        disabled={!startLocation && !endLocation}
      >
        Clear
      </Button>
    </div>
  );
}
