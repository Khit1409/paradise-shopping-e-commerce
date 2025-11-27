import { Controller, Get, Param, Patch, Put, Req } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  /**
   * get all notification
   */
  @Get('')
  async getAllNotificate(@Req() req: JwtAuthGuardRequest) {
    const { id } = req.user;
    return await this.notificationService.getAll(id);
  }
  /**
   * change seen status
   */
  @Patch(':id')
  async changeSeenStatus(@Param('id') id: string) {
    return await this.notificationService.seenNotification(id);
  }
  /**
   * change  seen all notification
   */
  @Put('all')
  async seenAll(@Req() req: JwtAuthGuardRequest) {
    const { id } = req.user;
    return await this.notificationService.seenNotification('all', id);
  }
}
