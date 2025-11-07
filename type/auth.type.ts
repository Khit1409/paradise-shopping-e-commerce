export type SellerLoginRequest = {
  email: string;
  password: string;
  role: "seller";
};
/**
 * API TYPE
 */
/**
 * GENERAL ERROR TYPE
 * Used for common service error responses
 */
export type UserServiceGeneralErrorType = {
  resultCode: number;
  message: string;
};
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
