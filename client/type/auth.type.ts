/**
 * GENERAL ERROR TYPE
 * Used for common service error responses
 */
export type UserServiceGeneralErrorType = {
  resultCode: number;
  message: string;
};
/**
 * type of role
 */
export type UserRole = "seller" | "user";
/**
 * USER REGISTER REQUEST TYPE
 * Used when creating a new user account
 */
export type RegisterRequestType = {
  firtname: string;
  avatar?: string;
  email: string;
  phone: string;
  lastname: string;
  password: string;
};
/**
 * type of request when login
 */
export type SellerLoginRequest = {
  email: string;
  password: string;
  role: "seller";
};
/**
 * export type user authenticated repsonse
 */
export type AuthenticatedUserResponse = {
  id: string;
  avatar: string | null;
  firtname: string;
  fullname: string;
  lastname: string;
  store_id: string | null;
  role: "seller" | "user";
  email: string[];
  phone: string[];
  address: string[];
  created_at: Date;
};
