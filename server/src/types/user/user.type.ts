/**
 * register request type
 */
export type UserRegisterRequest = {
  firtname: string;
  lastname: string;
  /**
   * phone of authentication is not information in mongoodb
   */
  phone: string;
  /**
   * email of authentication is not information in mongoodb
   */
  email: string;
  password: string;
  avatar: string | null;
};
