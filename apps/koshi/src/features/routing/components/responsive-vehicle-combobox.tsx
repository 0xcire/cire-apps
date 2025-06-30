import { useState } from 'react';
import { useSearch } from '@tanstack/react-router';

import { useMediaQuery } from 'usehooks-ts';
import { formatNumber, getVehicleDisplayName } from '@/lib/utils';

import { Button } from '@cire/ui/components/button';
import { Typography } from '@cire/ui/components/typography';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@cire/ui/components/command';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@cire/ui/components/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@cire/ui/components/popover';

import type { Vehicle } from '@/features/vehicles/api/methods';
import type { SearchParamKeys } from '@/routes/routing';

export function ResponsiveVehicleCombobox({
  updateSearch,
  vehicles,
}: {
  vehicles: Vehicle[] | undefined;
  updateSearch: (searchKey: SearchParamKeys, value: unknown) => void;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const { vehicleId } = useSearch({ from: '/routing/' });

  const currentVehicle =
    selectedVehicle ||
    getVehicleDisplayName(vehicles?.find((v) => v.id === vehicleId));

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full -mb-2">
            {vehicleId ? <>{currentVehicle}</> : <>Select Vehicle</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="center"
          style={{
            width: 'var(--radix-popover-trigger-width)',
            maxHeight: 'var(--radix-popover-content-available-height)',
          }}
        >
          <StatusList
            setOpen={setOpen}
            vehicles={vehicles}
            setSelectedVehicle={setSelectedVehicle}
            updateSearch={updateSearch}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full mb-2">
          {vehicleId ? <>{currentVehicle}</> : <>Select Vehicle</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            vehicles={vehicles}
            setOpen={setOpen}
            setSelectedVehicle={setSelectedVehicle}
            updateSearch={updateSearch}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedVehicle,
  vehicles,
  updateSearch,
}: {
  setOpen: (open: boolean) => void;
  vehicles: Vehicle[] | undefined;
  setSelectedVehicle: React.Dispatch<React.SetStateAction<string | null>>;
  updateSearch: (searchKey: SearchParamKeys, value: unknown) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter vehicles..." />
      <CommandList>
        <CommandEmpty>No vehicles found.</CommandEmpty>
        <CommandGroup>
          {vehicles?.map((vehicle) => (
            <CommandItem
              key={`${vehicle.id}`}
              value={getVehicleDisplayName(vehicle)}
              onSelect={(value) => {
                updateSearch('vehicleId', vehicle.id);
                setSelectedVehicle(value);
                setOpen(false);
              }}
              className="flex items-center justify-between"
            >
              <p>{getVehicleDisplayName(vehicle)}</p>
              <Typography variant="muted">
                {formatNumber(
                  vehicle.appxFuelEfficiency * vehicle.fuelTankSize,
                  1,
                )}{' '}
                mi.
              </Typography>
            </CommandItem>
          )) ?? <></>}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
