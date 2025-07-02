import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { redirect } from '@tanstack/react-router';
import { getSession } from './better-auth';

import type { ClassValue } from 'clsx';
import type { ParsedLocation } from '@tanstack/react-router';

import type { Vehicle } from '../features/vehicles/api/methods';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result as string);

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export async function authGuard(location: ParsedLocation<{}>) {
  const { data, error } = await getSession();
  if (!data || error) {
    throw redirect({
      to: '/auth/sign-in',
      search: {
        redirect: location.href,
      },
    });
  }
}

export function formatNumber(n: number, d: number) {
  return n.toLocaleString('en-US', { maximumFractionDigits: d });
}

export function getVehicleDisplayName(vehicle: Vehicle | undefined) {
  return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
}

/**
 * For a time value of 'xy', if x === 0, return y, else return xy
 */
function noPrefix(s: string) {
  return s[0] === '0' ? s[1] : s;
}

/**
 * convert seconds format to 'X h YY min'
 */
export function convertSecondsToHumanReadableFormat(seconds: number) {
  //@ts-expect-error type
  const date = new Date(null);
  date.setSeconds(seconds);
  const time = date.toISOString().substring(11, 19);
  const split = time.split(':');

  return `${noPrefix(split[0])} h ${noPrefix(split[1])} min`;
}
