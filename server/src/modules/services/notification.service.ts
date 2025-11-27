import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../domain/repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly notifiRepo: NotificationRepository) {}

  /**
   * create new notification
   * @param name
   * @param message
   * @param user_id
   * @returns
   */
  async createNotifi(name: string, message: string, user_id: string) {
    return await this.notifiRepo.create(name, message, user_id);
  }
  /**
   * get all notification
   * @param user_id
   */
  async getAll(user_id: string) {
    return await this.notifiRepo.getAll(user_id);
  }
  /**
   * seen
   */
  async seenNotification(id: string, user_id?: string) {
    return await this.notifiRepo.isSeen(id, user_id);
  }
}
