import axios from "axios";

/**
 * config axios method
 */
export const apiAction = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_API_URL}/`,
  withCredentials: true,
});
