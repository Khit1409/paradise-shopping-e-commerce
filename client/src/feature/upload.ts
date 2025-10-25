import { apiAction } from "@/config/axios";
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
  const res = await apiAction.post(`images/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const rs: string = res.data.url;
  return rs;
}
