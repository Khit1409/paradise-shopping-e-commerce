import { CloudinaryController } from '@/controllers/cloudinary.controller';
import { CloudinaryService } from '@/services/cloudinary.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
