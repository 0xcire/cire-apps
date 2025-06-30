import ky from 'ky';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  fuelTankSize: number;
  appxFuelEfficiency: number;
  mileage: number;
  vin: string;
}

export interface GetVehiclesResponse {
  vehicles: Vehicle[];
}

// NOTE: as users are limited in creating vehicles by VIN, really should only expect a few cars per user
// so no pagination or anything really required here
export async function getVehicles() {
  return await ky
    .get(`${import.meta.env.VITE_API_BASE_URL}/vehicles`, {
      credentials: 'include',
    })
    .json<GetVehiclesResponse>();
}
