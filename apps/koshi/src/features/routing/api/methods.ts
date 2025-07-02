import ky, { HTTPError } from 'ky';
import type {
  GenerateRouteResponse,
  SaveRouteOpts,
  SaveRouteResponse,
} from './types';
import type { GenerateRouteOpts } from './types';

export async function generateRoute(opts: Partial<GenerateRouteOpts>) {
  // @ts-expect-error type
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

export async function saveRoute(opts: SaveRouteOpts) {
  try {
    return await ky
      .post(`${import.meta.env.VITE_API_BASE_URL}/routes`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        json: opts,
      })
      .json<SaveRouteResponse>();
  } catch (error) {
    if (error instanceof HTTPError) {
      throw await error.response.json();
    }

    throw error;
  }
}
