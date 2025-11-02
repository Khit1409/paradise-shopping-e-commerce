import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { ImageController } from "./cloudinary.controller";
@Module({
  providers: [CloudinaryService],
  controllers: [ImageController],
  exports: [CloudinaryService], // nếu muốn dùng ở module khác
})
export class CloudinaryModule {}
