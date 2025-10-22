/**
 * App navigation type
 *
 */
export interface NavigationDataType {
  _id: string;
  navName: string;
  navIcon?: string;
  navUrl: string;
}
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
