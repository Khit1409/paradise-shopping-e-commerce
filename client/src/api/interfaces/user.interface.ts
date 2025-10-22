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
  user_id: string;

  /** User email (unique, used for login) */
  user_email: string;

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
  user_firtname: string;

  /** Avatar image (can be undefined or null) */
  user_avatar?: string;

  /** Unique email used for login */
  user_email: string;

  /** User phone number */
  user_phone: string;

  /** Last name of the user */
  user_lastname: string;

  /** User password */
  user_password: string;

  /** User’s primary address (optional) */
  user_address?: string;
};
