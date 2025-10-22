import axios from "axios";
import {
  NavigationDataType,
  ProvinceApiType,
  WardApiType,
} from "../interfaces/app.interface";

/**
 * api configuration
 */
const PROVINCE_API_URL = process.env.NEXT_PUBLIC_PROVINCE_API_URL!;
const WARD_API_URL = process.env.NEXT_PUBLIC_WARD_API_URL!;

/**
 * Get navigation for routing service in webisite , res null if user is not login
 * @returns
 */
export async function getNavigationService(): Promise<NavigationDataType[]> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/app/navigation`
  );
  const api: NavigationDataType[] = res.data;
  return api;
}
/**
 * get address api using for some service relationship register or order or setting account
 * @returns  province api and ward api
 */
export async function getAddressService(): Promise<{
  province: ProvinceApiType[];
  ward: WardApiType[];
}> {
  const [wardApi, provinceApi] = await Promise.all([
    (await axios.get(WARD_API_URL)).data,
    (await axios.get(PROVINCE_API_URL)).data,
  ]);
  const api: { province: ProvinceApiType[]; ward: WardApiType[] } = {
    province: provinceApi,
    ward: wardApi,
  };

  return api;
}
/**
 *
 */
