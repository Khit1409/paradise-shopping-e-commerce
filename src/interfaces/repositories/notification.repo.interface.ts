import { NotificationResponseDto } from '@/modules/domain/dto/notification/notification-response.dto';
import { GeneralHandleResponse } from './general.interface';

export interface INotificationRepository {
  /**
   * Auto remove
   * @param param0
   */
  autoRemove: () => Promise<void>;
  /**
   * create
   * @param name
   * @param message
   * @param user_id
   * @returns
   */
  create: (
    name: string,
    message: string,
    user_id: string,
  ) => Promise<GeneralHandleResponse>;
  /**
   * get
   */
  getAll: (user_id: string) => Promise<NotificationResponseDto[]>;
  /**
   * seend message
   */
  isSeen: (id: string) => Promise<GeneralHandleResponse>;
}
