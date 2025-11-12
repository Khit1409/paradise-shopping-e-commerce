import { CloudinaryService } from '@/services/cloudinary.service';
import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('File not got!');
      }
      const result = await this.cloudinaryService.uploadFile(file);
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
