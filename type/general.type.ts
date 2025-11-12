/**
 * type of handle response from server
 */
export interface GeneralHandleResponse {
  message: string;
  success: boolean;
  error: string | null;
}
