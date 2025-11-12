/**
 * General handle response interface
 * mesage: is detail of handle result
 * error: type of error null if have not error
 * success: true if success false if fail
 */
export interface GeneralHandleResponse {
  message: string;
  error: string | null;
  success: boolean;
}
