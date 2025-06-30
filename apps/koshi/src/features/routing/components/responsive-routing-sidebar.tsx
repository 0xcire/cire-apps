import { useEffect, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { useVehicles } from '@/features/vehicles/api/queries';
import { useGetRoute } from '../api/queries';

import { useMediaQuery } from 'usehooks-ts';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { EndpointsGeocoder } from './endpoints-geocoder';
import { RouteTimeline } from './route-timeline';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@cire/ui/components/sheet';
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
import { Button } from '@cire/ui/components/button';
import { Separator } from '@cire/ui/components/separator';

import { Route } from 'lucide-react';

import { ResponsiveVehicleCombobox } from './responsive-vehicle-combobox';

import type { SearchParamKeys } from '@/routes/routing';
import type { Vehicle } from '@/features/vehicles/api/methods';
import type { GenerateRouteResponse } from '../api/types';

export function ResponsiveRoutingSidebar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const s = useSearch({
    from: '/routing/',
  });
  const params = {
    startLocation: s.startLocation,
    endLocation: s.endLocation,
    vehicleId: s.vehicleId,
  };
  const navigate = useNavigate({ from: '/routing' });
  const { data: vehicles } = useVehicles();

  const { data, refetch, isError, error, isFetching, isRefetching } =
    useGetRoute(params);

  const updateSearch = (searchKey: SearchParamKeys, value: unknown) => {
    navigate({ search: (prev) => ({ ...prev, [searchKey]: value }) });
  };

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError]);

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={twMerge(
            open ? 'hidden' : '',
            'cursor-pointer absolute left-5 top-20 z-[1000] p-1 bg-primary rounded-md',
          )}
        >
          <Route size={24} strokeWidth={1} color="#fff" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[400px] sm:w-[540px] p-2">
          <SheetHeader>
            <SheetTitle>Koshi Route Planner</SheetTitle>
            <SheetDescription>
              Get route details for a selected start, end, and personal vehicle.
            </SheetDescription>
          </SheetHeader>

          <Content
            vehicles={vehicles}
            data={data}
            updateSearch={updateSearch}
          />

          <SheetFooter className="mt-auto p-0">
            <SheetClose asChild>
              <Button variant="outline" className="mx-auto cursor-pointer">
                Cancel
              </Button>
            </SheetClose>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer flex-1"
                onClick={() => {
                  refetch();
                }}
                disabled={isFetching || isRefetching || !!data}
              >
                Generate Route
              </Button>
              {data && <Button className="flex-1">Save Route</Button>}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={twMerge(
          open ? 'hidden' : '',
          'cursor-pointer absolute left-5 top-20 z-[1000] p-1 bg-primary rounded-md',
        )}
      >
        <Route size={24} strokeWidth={1} color="#fff" />
      </DrawerTrigger>
      <DrawerContent className="p-2 gap-2">
        <div className="flex-1 overflow-y-auto scrollbar scrollbar-thumb-foreground scrollbar-track-background">
          <DrawerHeader>
            <DrawerTitle>Koshi Route Planner</DrawerTitle>
            <DrawerDescription>
              Get route details for a selected start, end, and personal vehicle.
            </DrawerDescription>
          </DrawerHeader>

          <Content
            vehicles={vehicles}
            data={data}
            updateSearch={updateSearch}
          />

          <DrawerFooter className="p-0">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>

            <div className="flex gap-2">
              <Button
                className="cursor-pointer flex-1"
                onClick={() => {
                  refetch();
                }}
                disabled={isFetching || isRefetching || !!data}
              >
                Generate Route
              </Button>
              {data && <Button className="flex-1">Save Route</Button>}
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface ContentProps {
  updateSearch: (searchKey: SearchParamKeys, value: unknown) => void;
  vehicles: Vehicle[] | undefined;
  data: GenerateRouteResponse | undefined;
}

function Content({ vehicles, updateSearch, data }: ContentProps) {
  const s = useSearch({ from: '/routing/' });
  return (
    <>
      <ResponsiveVehicleCombobox
        vehicles={vehicles}
        updateSearch={updateSearch}
      />
      <EndpointsGeocoder updateSearch={updateSearch} />

      <Separator />

      <div className="py-2 flex-1 overflow-scroll scrollbar scrollbar-thumb-foreground scrollbar-track-background">
        {data && (
          <RouteTimeline
            endpoints={[
              { ...s.startLocationCoordinates, location: s.startLocation },
              { ...s.endLocationCoordinates, location: s.endLocation },
            ]}
            stations={data.stations}
            meta={data.meta}
          />
        )}
      </div>
    </>
  );
}
