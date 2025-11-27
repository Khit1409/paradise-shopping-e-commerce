import { NotificationDoc } from '@/infrastructure/database/mongoodb/notification.schema';
import { GeneralHandleResponse } from '@/interfaces/repositories/general.interface';
import { INotificationRepository } from '@/interfaces/repositories/notification.repo.interface';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { NotificationResponseDto } from '@/dto/notification/notification-response.dto';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationDoc>,
  ) {}
  /**
   * Auto remove repository when created is 30 day
   */
  autoRemove: () => Promise<void> = async () => {
    try {
      const msPerDay = 24 * 60 * 60 * 1000 * 30;
      const nowDay = Date.now();
      const isDeleteDay = new Date(nowDay - msPerDay);
      await this.notificationModel.deleteMany({
        createdAt: isDeleteDay,
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * create notification
   */
  create: (
    name: string,
    message: string,
    user_id: string,
  ) => Promise<GeneralHandleResponse> = async (name, message, user_id) => {
    try {
      const newNotifi = await this.notificationModel.create({
        user_id,
        name,
        message,
        seen: false,
      });
      if (!newNotifi) {
        return {
          message: 'Create new notification is failed',
          error: 'create notification error',
          success: false,
        };
      }
      return {
        message: 'Send notifi is success',
        error: null,
        success: true,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * get user notificate when user open notifi modal
   */
  getAll: (user_id: string) => Promise<NotificationResponseDto[]> = async (
    user_id,
  ) => {
    try {
      const data = await this.notificationModel
        .find({ user_id })
        .select('-__v ')
        .lean<NotificationDoc[]>();
      return data.map(
        (noti) =>
          new NotificationResponseDto({
            id: noti._id as string,
            name: noti.name,
            message: noti.message,
            seen: noti.seen,
            created_at: noti.createdAt,
          }),
      );
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * change seen status
   */
  isSeen: (id?: string, user_id?: string) => Promise<GeneralHandleResponse> =
    async (id, user_id) => {
      try {
        if (id === 'all') {
          await this.notificationModel.updateMany({ user_id }, { seen: true });
          return {
            message: 'Seen notification!',
            error: null,
            success: true,
          };
        }
        await this.notificationModel.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(id) },
          { seen: true },
        );
        return { message: 'Seen notification!', error: null, success: true };
      } catch (error) {
        return {
          message: `${error}`,
          error: 'notifaction error',
          success: false,
        };
      }
    };
}
