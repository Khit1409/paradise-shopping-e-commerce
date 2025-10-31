import axios from "axios";
import {
  CarouselApiDataType,
  NavigationDataType,
  ProvinceApiType,
  WardApiType,
} from "../type/app.interface";
import { apiAction } from "../config/fetch-api.config";

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
  const res = await apiAction.get(`app/navigation`);
  const api: NavigationDataType[] = res.data.api;
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
 * get carousel api for creat slider
 */
/**
 * @param param0
 * @returns {CarouselApiDataType[]}
 */
export async function getCarousel(): Promise<CarouselApiDataType[]> {
  try {
    const res = await apiAction.get(`app/carousel`);
    const data: CarouselApiDataType[] = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
