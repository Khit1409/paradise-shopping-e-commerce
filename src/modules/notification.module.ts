import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controller/notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from '@/infrastructure/database/mongoodb/notification.schema';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    //mongoose schema
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
    MailerModule,
    DatabaseModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
