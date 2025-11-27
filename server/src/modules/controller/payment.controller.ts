import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PaymentService } from '@/services/payments.service';
import type { Response, Request } from 'express';
import type { Webhook } from '@payos/node';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  /**
   * get webhook from payos request
   *  https://perspiry-promisingly-bethany.ngrok-free.dev/recive-payos-webhook
   */
  @Get()
  test(@Res() res: Response) {
    return res.redirect('http://localhost:3000');
  }
  /**
   * Get request from payos when success payment
   * @param body
   * @param res
   */
  @Post('recive-payos-webhook')
  recivePayOSWebhook(@Body() body: Webhook) {
    this.paymentService.webHookOfPayos(body);
  }
  /**
   * Delete cancel payment
   * @param body
   * @returns
   */
  @Post('cancel-payment')
  async cancelPaymentController(
    @Body() body: { paymentLinkId: string; cancellationReason?: string },
  ) {
    const { paymentLinkId, cancellationReason } = body;
    const result = await this.paymentService.cancelPaymentLink(
      paymentLinkId,
      cancellationReason,
    );
    return result;
  }
}
