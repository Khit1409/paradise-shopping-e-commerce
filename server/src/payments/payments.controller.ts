import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import type { Response, Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItems, Orders } from "src/orders/entities/order.entity";
import { Repository } from "typeorm";
import type { Webhook } from "@payos/node";

@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    @InjectRepository(Orders) private readonly orderRepo: Repository<Orders>,
    @InjectRepository(OrderItems)
    private readonly orderItemRepo: Repository<OrderItems>,
  ) {}

  /**
   * get webhook from payos request
   *  https://perspiry-promisingly-bethany.ngrok-free.dev/recive-payos-webhook
   */
  @Get("recive-payos-webhook")
  webhook() {
    console.log("hello");
  }
  @Post("recive-payos-webhook")
  async recivePayOSWebhook(@Body() body: Webhook, @Res() res: Response) {
    const result = await this.paymentsService.webHookOfPayos(body);
    const { message, resultCode, statusCode } = result;
    return res.status(statusCode).json({ message, resultCode });
  }
}
