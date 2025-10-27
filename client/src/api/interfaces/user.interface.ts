/**
 * =====================
 * USER TYPE DEFINITION
 * =====================
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
 * USER AUTHENTICATE RESPONSE
 * Returned from the server when a user is authenticated
 */
export interface UserAuthenticateResponse {
  /** Unique user ID */
  id: string;

  /** User email (unique, used for login) */
  email: string;

  /** User phone number (can also be used for login) */
  user_phone: string;

  /** User avatar URL (can be null) */
  user_avatar: string | null;

  /** Display name of the user */
  user_name: string;

  /** Member ID (linked to membership table if applicable) */
  member_id: string;

  /** If the user is a seller, contains store information */
  user_store?: string;

  /** User role: seller or standard user */
  user_role: "seller" | "user";
}

/**
 * USER REGISTER REQUEST TYPE
 * Used when creating a new user account
 */
export type RegisterType = {
  /** First name of the user */
  firtname: string;

  /** Avatar image (can be undefined or null) */
  avatar?: string;

  /** Unique email used for login */
  email: string;

  /** User phone number */
  phone: string;

  /** Last name of the user */
  lastname: string;

  /** User password */
  password: string;
};
