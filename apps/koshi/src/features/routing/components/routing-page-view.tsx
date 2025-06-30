import { RoutingMap } from './routing-map';
import { ResponsiveRoutingSidebar } from './responsive-routing-sidebar';
import { MapProvider } from 'react-map-gl/mapbox';

export function RoutingPageView() {
  return (
    <MapProvider>
      <RoutingMap />
      <ResponsiveRoutingSidebar />
    </MapProvider>
  );
}
