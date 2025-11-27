import axios from "axios";
import {
  NotificationData,
  ProvinceApiType,
  UIDataResponse,
  WardApiType,
} from "@/type/app.interface";
import { apiAction } from "@/config/fetch-api.config";
import { GeneralHandleResponse } from "@/type/general.type";

/**
 * api configuration
 */
const PROVINCE_API_URL = process.env.NEXT_PUBLIC_PROVINCE_API_URL!;
const WARD_API_URL = process.env.NEXT_PUBLIC_WARD_API_URL!;

/**
 * Get navigation for routing service in webisite and carousel api for carousel setcion,
 * @returns
 */
export async function getUI(): Promise<UIDataResponse> {
  const res = await apiAction.get(`ui`);
  const api: UIDataResponse = res.data;
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
 * get user notification by id from cookie
 * @param param0
 * @returns
 */
export async function getUserNotification(): Promise<NotificationData[]> {
  try {
    const res = await apiAction.get("notification");
    const data: NotificationData[] = res.data;
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
/**
 * seen notification
 */
export async function seenNotification(
  id: string
): Promise<GeneralHandleResponse> {
  const res =
    id === "all"
      ? await apiAction.put(`notification/all`)
      : await apiAction.patch(`notification/${id}`);
  return res.data as GeneralHandleResponse;
}
