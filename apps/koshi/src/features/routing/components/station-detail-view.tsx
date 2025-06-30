import { Link } from '@tanstack/react-router';
import { useMediaQuery } from 'usehooks-ts';

import {
  CreditCardIcon,
  EllipsisIcon,
  FuelIcon,
  LockOpenIcon,
  PhoneIcon,
} from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@cire/ui/components/drawer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@cire/ui/components/dialog';
import { Button } from '@cire/ui/components/button';
import { Typography } from '@cire/ui/components/typography';

import {
  accessDetailCodeMap,
  cardsAcceptedCodeMap,
  facilityTypesMap,
} from '../types';
import type { Station } from '../api/types';

export function StationDetailView({ station }: { station: Station }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const facility = station.facilityType
    ? ` - ${facilityTypesMap[station.facilityType as keyof typeof facilityTypesMap]}`
    : '';

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className="cursor-pointer ml-auto">
          <EllipsisIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${station.stationName} ${facility}`}</DialogTitle>
            <DialogDescription>
              Hours: {station.accessDaysTime}
            </DialogDescription>
          </DialogHeader>

          <Content station={station} />

          <DialogFooter>
            <Button variant="link" className="px-0 w-content" asChild>
              <a
                href={`https://afdc.energy.gov/stations#/station/${station.id}/edit`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Report a change
              </a>
            </Button>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className="cursor-pointer ml-auto">
        <EllipsisIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{`${station.stationName} ${facility}`}</DrawerTitle>
          <DrawerDescription>Hours: {station.accessDaysTime}</DrawerDescription>
        </DrawerHeader>

        <div className="p-4 md:p-8">
          <Content station={station} />
        </div>

        <DrawerFooter>
          <Button variant="link" className="px-0 w-content" asChild>
            <a
              href={`https://afdc.energy.gov/stations#/station/${station.id}/edit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a change
            </a>
          </Button>
          <DrawerClose>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Content({ station }: { station: Station }) {
  const cardAcceptedList = station.cardsAccepted?.split(' ');
  const phoneNumber = station.stationPhone?.replaceAll('-', '');
  const accessType = station.accessDetailCode
    ? ` - ${
        accessDetailCodeMap[
          station.accessDetailCode as keyof typeof accessDetailCodeMap
        ]
      }`
    : '';
  const midBlendStringList = station.e85OtherEthanolBlends?.join(', ');

  return (
    <div className="flex flex-col gap-4">
      <p>
        {station.streetAddress}. {station.city}, {station.state}
      </p>

      <Button asChild>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${station.point.latitude}%2C${station.point.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's go!
        </a>
      </Button>

      {phoneNumber && (
        <Button variant="link" className="has-[>svg]:px-0" asChild>
          <a href={`tel:${phoneNumber}`}>
            <PhoneIcon size={14} className="mt-[2px]" />
            {station.stationPhone}
          </a>
        </Button>
      )}

      <div>
        <LockOpenIcon className="mb-2" />
        Public
        {/* Hard coded. Only querying for public stations when finding route...  */}
        {station.accessDetailCode && <span>{accessType}</span>}
      </div>

      <div>
        <FuelIcon className="mb-2" />
        <Typography variant="large">
          Mid blends: {station.e85blenderPump ? 'Yes' : 'No'}
        </Typography>
        {station.e85blenderPump ? (
          <Typography variant="large">
            {`Blends: ${midBlendStringList}`}
          </Typography>
        ) : (
          <Button className="p-0" variant="link" asChild>
            <Link to="/blend-calculator">Calculate mid blends here</Link>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {cardAcceptedList && <CreditCardIcon />}
        <div>
          {cardAcceptedList?.map((card, idx) => (
            <span>
              {cardsAcceptedCodeMap[card as keyof typeof cardsAcceptedCodeMap]}
              {idx !== cardAcceptedList.length - 1 ? ',' : ''}{' '}
            </span>
          ))}
        </div>
      </div>

      <div>
        {station.dateLastConfirmed && (
          <Typography variant="muted" className="mb-2">
            {`Last Confirmed: ${new Date(station.dateLastConfirmed).toLocaleDateString()}`}
          </Typography>
        )}

        <Typography variant="muted">
          Koshi route planning is heavily reliant on{' '}
          <a
            href="https://www.nrel.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NREL
          </a>{' '}
          station data so we recommend calling ahead to ensure{' '}
          {station.stationName} still offers ethanol based fuels!
        </Typography>
      </div>
    </div>
  );
}
