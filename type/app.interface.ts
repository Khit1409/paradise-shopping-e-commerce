/**
 * App navigation type
 *
 */
export interface NavigationDataType {
  _id: string;
  name: string;
  icon?: string;
  url: string;
}
/**
 * carousel api
 */
export interface CarouselApiDataType {
  _id: string;
  thumbnail: string;
  title: string;
}
export type UIDataResponse = {
  nav: NavigationDataType[];
  carousel: CarouselApiDataType[];
};
/**
 * Province api type
 */
export interface ProvinceApiType {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  wards: [];
}
/**
 * Wrad api type
 */
export interface WardApiType {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}
