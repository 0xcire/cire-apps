import { useState } from 'react';
import { Marker as CoreMarker, Popup } from 'react-map-gl/mapbox';
import { PhoneIcon } from 'lucide-react';

import { StationDetailView } from './station-detail-view';

import { Typography } from '@cire/ui/components/typography';
import { Button } from '@cire/ui/components/button';

import type { Station } from '../api/types';

// NOTE: there is room for improvement here to reformat response data to be geoJSON 'compliant'
// and param could be a more generic Feature, but we shall see
// Not a hard change but also don't imagine markers for many other entities currently
export function StationMarker({ station }: { station: Station }) {
  const [showPopover, setShowPopover] = useState(false);

  const phoneNumber = station.stationPhone?.replaceAll('-', '');

  return (
    <>
      <CoreMarker
        latitude={station.point.latitude}
        longitude={station.point.longitude}
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopover(!showPopover);
        }}
      />

      {showPopover && (
        <Popup
          latitude={station.point.latitude}
          longitude={station.point.longitude}
          anchor="bottom"
          onClose={() => setShowPopover(false)}
          closeButton={false}
          closeOnMove={true}
          offset={35}
          focusAfterOpen={true}
        >
          <div className="p-4 bg-popover w-[200px] rounded-sm flex items-start flex-col gap-2">
            <Typography variant="large">{station.stationName}</Typography>
            <div>
              <Typography variant="p">{station.streetAddress}</Typography>
              <Typography variant="small" className="font-normal">
                {station.city}, {station.state} {station.zip} {station.plus4}
              </Typography>
            </div>

            {phoneNumber && (
              <Button variant="link" className="has-[>svg]:px-0" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <PhoneIcon size={14} className="mt-[2px]" />
                  {station.stationPhone}
                </a>
              </Button>
            )}
            <StationDetailView station={station} />
          </div>
        </Popup>
      )}
    </>
  );
}
