import { cloudinaryConfig } from '@/configs/cloudinary/cloudinary.config';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinaryConfig();
  }

  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    try {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'paradise_shopping' },
          (error, result) => {
            if (error) {
              return reject(new InternalServerErrorException(error.message));
            }
            if (!result) return reject(new Error('Upload failed'));
            resolve(result);
          },
        );
        const fileBuffer = file.buffer;
        uploadStream.end(fileBuffer);
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
