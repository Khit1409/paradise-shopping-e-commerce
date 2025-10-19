import axios from "axios";

export async function uploadImageToCloud(file: File | undefined) {
  if (!file) {
    return;
  }
  const data = new FormData();
  data.append("image", file);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/images/upload`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  const rs: string = res.data.url;
  return rs;
}
