import type { CancelPaymentResponse } from '@/types/payment/payment.type';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentLinkRequest, PayOS, Webhook } from '@payos/node';
import axios from 'axios';
import { createHmac } from 'crypto';

@Injectable()
export class PaymentService {
  private readonly payosApiUrl: string;
  private readonly clientId: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject('PAYOS_CLIENT')
    private readonly payosClient: InstanceType<typeof PayOS>,
  ) {
    this.payosApiUrl = this.configService.get('PAYOS_CANCEL_URL')!;
    this.clientId = this.configService.get('PAYOS_CLIENT_ID')!;
    this.apiKey = this.configService.get('PAYOS_API_KEY')!;
  }
  /**
   * when checkout succesfull PayOS will send a request to
   * server and server will handle update pay state or delte order by order code
   * @param body
   */
  webHookOfPayos(body: Webhook) {
    try {
      /**
       * Success full checkout
       */
      if (body.success === true) {
        console.log('Đã hoàn thành thanh toán');
      }
    } catch (error) {
      throw new UnauthorizedException(`${error}`);
    }
  }

  /**
   * create payment link if user choosen paymethod is online
   * @param orderId
   * @param orderCode
   * @param orderContact
   * @param orderItem
   * @returns
   */
  async createPaymentLink({
    orderCode,
    item,
    contact,
  }: {
    orderCode: string | number;
    item: { name: string; totalPrice: number; quantity: number };
    contact: { email: string; phone: string; address: string };
  }) {
    try {
      const { name, totalPrice, quantity } = item;
      const { address, email, phone } = contact;

      const expiredAt = Math.floor(Date.now() / 1000) + 5 * 60;

      const payload: CreatePaymentLinkRequest = {
        orderCode: Number(orderCode),
        amount: Number(totalPrice),
        description: `Thanh toán đơn hàng`,
        returnUrl: `http://localhost:3000/user`,
        cancelUrl: `http://localhost:3000/user`,
        items: [
          {
            name,
            price: totalPrice,
            quantity,
          },
        ],
        expiredAt,
        buyerEmail: email,
        buyerPhone: phone,
        buyerAddress: address,
      };

      //create signature
      const dataToSign = [
        `amount=${payload.amount}`,
        `cancelUrl=${payload.cancelUrl}`,
        `description=${payload.description}`,
        `expiredAt=${payload.expiredAt}`,
        `orderCode=${payload.orderCode}`,
        `returnUrl=${payload.returnUrl}`,
      ].join('&');

      const signature = createHmac('sha256', process.env.PAYOS_CHECKSUM_KEY)
        .update(dataToSign)
        .digest('hex');

      const payment = await this.payosClient.paymentRequests.create({
        ...payload,
        signature,
      });

      return payment;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  /**
   * cancel checkout
   * @param paymentLinkId
   * @param cancellationReason
   * @returns
   */
  async cancelPaymentLink(paymentLinkId: string, cancellationReason?: string) {
    try {
      const response = await axios.post(
        `${this.payosApiUrl}/${paymentLinkId}/cancel`,
        { cancellationReason },
        {
          headers: {
            'x-client-id': this.clientId,
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const result: CancelPaymentResponse =
        response.data as CancelPaymentResponse;
      if (!result) {
        throw new BadRequestException(`Loi huy don hang`);
      }
      return { resultCode: 1, message: 'Success' };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to cancel payment link, error:${error}`,
      );
    }
  }
}
