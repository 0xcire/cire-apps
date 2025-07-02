import { FlagIcon, MapPinIcon } from 'lucide-react';

import {
  Timeline,
  TimelineContent,
  TimelineDate as TimelineMeta,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@cire/ui/components/timeline';
import { useId } from 'react';
import { CONVERT_METERS_TO_MILES } from '@/constants';
import { convertSecondsToHumanReadableFormat, formatNumber } from '@/lib/utils';

import type { GenerateRouteResponse } from '../api/types';
import type { RouteDurationOverview } from '../types';

export function RouteTimeline({
  stations,
  meta,
  endpoints,
  overview: { totalMeters, totalSeconds },
}: Omit<GenerateRouteResponse, 'routePolylineAsWkt'> & {
  endpoints: {
    latitude?: number;
    longitude?: number;
    location: string | undefined;
  }[];
  overview: RouteDurationOverview;
}) {
  const startId = useId();
  const endId = useId();

  const nodes = [
    { id: startId, ...endpoints[0] },
    ...stations,
    { id: endId, ...endpoints[1] },
  ];

  const isDestinationNode = (idx: number) => idx === nodes.length - 1;

  return (
    <Timeline className="py-4" defaultValue={stations.length - 1}>
      {nodes.map((node, idx) => {
        if ('fuelTypeCode' in node) {
          return (
            <TimelineItem
              key={node.id}
              step={idx}
              className="group-data-[orientation=vertical]/timeline:ms-10"
            >
              <TimelineHeader>
                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
                <TimelineMeta>
                  <span>
                    {formatNumber(
                      meta.metersPerSegment[idx - 1] * CONVERT_METERS_TO_MILES,
                      1,
                    )}{' '}
                    mi.
                  </span>{' '}
                  {/* <span>
                    {formatNumber(
                      meta.secondsPerSegment[idx - 1] *
                        CONVERT_SECONDS_TO_HOURS,
                      1,
                    )}{' '}
                    hrs.
                  </span> */}
                  <span>
                    {convertSecondsToHumanReadableFormat(
                      meta.secondsPerSegment[idx - 1],
                    )}
                  </span>
                </TimelineMeta>
                <TimelineTitle>{node.stationName}</TimelineTitle>
                <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                  <MapPinIcon
                    className="group-not-data-completed/timeline-item:hidden"
                    size={16}
                  />
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent>
                <p>
                  {node.streetAddress}. {node.city}, {node.state}
                </p>
                <p>{node.stationPhone}</p>
              </TimelineContent>
            </TimelineItem>
          );
        }

        return (
          <TimelineItem
            key={node.id}
            step={idx}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              {isDestinationNode(idx) ? (
                <TimelineMeta>
                  <span>
                    {formatNumber(
                      meta.metersPerSegment[idx - 1] * CONVERT_METERS_TO_MILES,
                      1,
                    )}{' '}
                    mi.
                  </span>{' '}
                  <span>
                    {convertSecondsToHumanReadableFormat(
                      meta.secondsPerSegment[idx - 1],
                    )}
                  </span>
                </TimelineMeta>
              ) : (
                <TimelineMeta>Start</TimelineMeta>
              )}

              <TimelineTitle>{node.location}</TimelineTitle>
              <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                <FlagIcon
                  className="group-not-data-completed/timeline-item:hidden"
                  size={16}
                />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              {isDestinationNode(idx) && (
                <p>
                  {`Duration: ${convertSecondsToHumanReadableFormat(totalSeconds)} ( ${formatNumber(
                    totalMeters * CONVERT_METERS_TO_MILES,
                    1,
                  )} miles )`}
                </p>
              )}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
