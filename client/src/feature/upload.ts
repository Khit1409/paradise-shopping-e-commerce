import axios from "axios";

const CLOUD_API_URL = process.env.NEXT_PUBLIC_API_CLOUD_URL!;
/**
 * upload file for get url file
 * @param file
 * @returns
 */
export async function uploadImageToCloud(file: File | undefined) {
  if (!file) {
    return;
  }
  const data = new FormData();
  data.append("image", file);
  const res = await axios.post(`${CLOUD_API_URL}/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const rs: string = res.data.url;
  return rs;
}
