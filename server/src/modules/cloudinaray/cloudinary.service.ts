import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: "dk9rtdomy",
      api_key: "758242926259191",
      api_secret: "vLEwtA1CCFKSDQh_LwmWWa1MFmY",
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      console.log(file);
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "paradise_shopping" },
          (error, result) => {
            if (error) {
              const err = new Error();
              return reject(err);
            }
            if (!result) return reject(new Error("Upload failed"));
            resolve(result);
          },
        );
        uploadStream.end(file.buffer);
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
