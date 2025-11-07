import { uploadImageToCloud } from "../service/cloud.service";

export const OnchangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const { files } = e.target;
  if (files) {
    const file = files[0];
    const res = await uploadImageToCloud(file);
    if (res) {
      const { resultCode, url } = res;
      if (resultCode == 1) {
        return url;
      } else {
        return null;
      }
    }
  }
  return null;
};
