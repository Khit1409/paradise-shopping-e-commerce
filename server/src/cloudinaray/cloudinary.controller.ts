import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";

@Controller("images")
export class ImageController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("image")) // "image" = field trong form-data
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new Error("No file uploaded");
      }
      const result = await this.cloudinaryService.uploadImage(file);
      return {
        resultCode: 1,
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }
}
