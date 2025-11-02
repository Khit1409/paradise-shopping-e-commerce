import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { NormalHandleResponse } from "src/interfaces/server.types";

@Injectable()
export class EmailsService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * Send email when user order
   * @param userEmail
   * @param userName
   * @param storeName
   * @param orderCode
   * @param totalPrice
   */
  async sendOrderMail(
    userEmail: string,
    userName: string,
    storeName: string,
    orderCode: string | number,
    totalPrice: number
  ): Promise<NormalHandleResponse> {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: userName,
        template: "order_email",
        context: {
          userEmail,
          userName,
          storeName,
          orderCode,
          totalPrice,
        },
      });
      return { message: "ok", resultCode: 1, statusCode: 200 };
    } catch (error) {
      return { message: `${error}`, resultCode: 0, statusCode: 404 };
    }
  }
}
