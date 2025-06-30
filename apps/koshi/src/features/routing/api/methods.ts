import ky, { HTTPError } from 'ky';
import type { GenerateRouteResponse } from './types';
import type { GenerateRouteOpts } from './types';

export async function getRoute(opts: Partial<GenerateRouteOpts>) {
  const q = new URLSearchParams(opts).toString();

  try {
    if (
      !Object.keys(opts).every((key) => !!opts[key as keyof GenerateRouteOpts])
    ) {
      throw Error(
        'Please select a start/ending location and vehicle for this route.',
      );
    }

    return await ky
      .get(`${import.meta.env.VITE_API_BASE_URL}/routes/generate?${q}`, {
        credentials: 'include',
      })
      .json<GenerateRouteResponse>();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json();
    }

    throw error;
  }
}
