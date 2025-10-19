/**
 * User interface
 *
 */
export interface UserAuthenticateResponse {
  user_id: string;
  user_email: string;
  user_phone: string;
  user_avatar: string | null;
  user_name: string;
  member_id: string;
  user_store?: string;
  user_role: "seller" | "user";
}
