import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConfig = () => {
  return cloudinary.config({
    cloud_name: 'dk9rtdomy',
    api_key: '758242926259191',
    api_secret: 'vLEwtA1CCFKSDQh_LwmWWa1MFmY',
  });
};
