import axios from "axios";
import {
  NavigationDataType,
  ProvinceApiType,
  WradApiType,
} from "../interfaces/app.interface";
/**
 * Get navigation
 * @returns
 */
export async function getNavigationService() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/app/navigation`
  );
  const api: NavigationDataType[] = res.data;
  return api;
}
/**
 * get address api
 */
export async function getAddressService() {
  const [wardApi, provinceApi] = await Promise.all([
    (await axios.get(`https://provinces.open-api.vn/api/v2/w/`)).data,
    (await axios.get(`https://provinces.open-api.vn/api/v2/p/`)).data,
  ]);

  const api: { province: ProvinceApiType[]; ward: WradApiType[] } = {
    province: provinceApi,
    ward: wardApi,
  };

  

  return api;
}
/**
 *
 */
