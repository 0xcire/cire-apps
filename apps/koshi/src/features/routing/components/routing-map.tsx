import { useEffect, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import mapboxgl from 'mapbox-gl';
import {
  Map as CoreMap,
  Layer,
  Marker,
  Source,
  useMap,
  type LayerProps,
} from 'react-map-gl/mapbox';
import { wktToGeoJSON } from '@terraformer/wkt';

import { useGenerateRoute } from '../api/queries';

import { StationMarker } from './station-marker';

import { useTheme } from '@cire/ui/components/theme-provider';

import type { LineString } from 'geojson';

const routeLineLayerStyle: LayerProps = {
  id: 'route',
  type: 'line',
  source: 'route',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': '#888',
    'line-width': 4,
  },
};

export function RoutingMap() {
  const { theme } = useTheme();
  const map = useMap();
  const mapRef = map.routing_map?.getMap();

  const {
    startLocation,
    endLocation,
    vehicleId,
    endLocationCoordinates,
    startLocationCoordinates,
  } = useSearch({
    from: '/routing/',
  });

  const { data, refetch } = useGenerateRoute({
    startLocation,
    endLocation,
    vehicleId,
  });

  const routeGeoJson = useMemo(() => {
    if (!data) {
      const placeholder: ReturnType<typeof wktToGeoJSON> = {
        type: 'LineString',
        coordinates: [],
      };
      return placeholder;
    }

    return wktToGeoJSON(data.routePolylineAsWkt) as LineString;
  }, [data]);

  useEffect(() => {
    if (startLocation && endLocation && vehicleId) refetch();
  }, []);

  useEffect(() => {
    const appxCenter =
      routeGeoJson.coordinates[
        Math.floor((routeGeoJson.coordinates.length - 1) / 2)
      ];

    if (appxCenter) return;

    mapRef?.flyTo({
      center: {
        lng: appxCenter[0],
        lat: appxCenter[1],
      },
      zoom: 5,
    });
  }, [data]);

  return (
    <CoreMap
      reuseMaps
      id="routing_map"
      dragRotate={false}
      mapLib={mapboxgl}
      style={{
        height: '100%',
        width: '100%',
        flex: 1,
      }}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}
      initialViewState={{
        longitude: -73,
        latitude: 41,
        zoom: 5,
      }}
      mapStyle={
        theme === 'light'
          ? 'mapbox://styles/mapbox/light-v11'
          : 'mapbox://styles/mapbox/dark-v11'
      }
    >
      {startLocationCoordinates && (
        <Marker
          longitude={startLocationCoordinates?.longitude}
          latitude={startLocationCoordinates?.latitude}
          color="green"
        />
      )}

      {endLocationCoordinates && (
        <Marker
          longitude={endLocationCoordinates?.longitude}
          latitude={endLocationCoordinates?.latitude}
          color="red"
        />
      )}

      <Source id="route-line" type="geojson" data={routeGeoJson}>
        <Layer {...routeLineLayerStyle} />
      </Source>

      {data?.stations.map((s) => <StationMarker key={s.id} station={s} />)}
    </CoreMap>
  );
}
