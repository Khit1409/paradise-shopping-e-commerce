import { apiAction } from "@/config/axios";
/**
 * upload file for get url file
 * @param file
 * @returns
 */
export async function uploadImageToCloud(
  file: File
): Promise<{ resultCode: number; url: string }> {
  const data = new FormData();
  data.append("image", file);
  const res = await apiAction.post(`images/upload`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const { url, resultCode } = res.data;
  return { url, resultCode };
}
