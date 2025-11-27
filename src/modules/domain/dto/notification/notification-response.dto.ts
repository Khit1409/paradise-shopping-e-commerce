/**
 * notification list dto response
 */
export class NotificationResponseDto {
  id: string;
  name: string;
  message: string;
  seen: boolean;
  created_at: Date;
  constructor(partial: Partial<NotificationResponseDto>) {
    Object.assign(this, partial);
  }
}
