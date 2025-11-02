import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePaymentLinkRequest, PayOS, Webhook } from "@payos/node";
import axios from "axios";
import { CancelPaymentResponse } from"@/interfaces/payment";
import { OrderPersonContacts } from"@/modules/orders/entities/order-contact.entity";
import { OrderItems } from"@/modules/orders/entities/order-item.entity";
import {
  Orders,
} from"@/modules/orders/entities/order.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentsService {
  private readonly payosApiUrl: string;
  private readonly clientId: string;
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject("PAYOS_CLIENT")
    private readonly payosClient: InstanceType<typeof PayOS>,
    @InjectRepository(Orders) private readonly orderRepo: Repository<Orders>,
    @InjectRepository(OrderItems)
    private readonly orderItemRepo: Repository<OrderItems>,
    @InjectRepository(OrderPersonContacts)
    private readonly orderContactRepo: Repository<OrderPersonContacts>
  ) {
    this.payosApiUrl = this.configService.get("PAYOS_CANCEL_URL")!;
    this.clientId = this.configService.get("PAYOS_CLIENT_ID")!;
    this.apiKey = this.configService.get("PAYOS_API_KEY")!;
  }

  /**
   * when checkout succesfull PayOS will send a request to
   * server and server will handle update pay state or delte order by order code
   * @param body
   */
  async webHookOfPayos(body: Webhook): Promise<{
    message: string;
    statusCode: number;
    resultCode: number;
  }> {
    try {
      const data = body.data;
      const orderCode = data.orderCode;
      /**
       * Success full checkout
       */
      if (body.success === true) {
        const orderCode = data.orderCode;
        const thisOrder = await this.orderRepo.findOne({
          where: { orderCode },
        });
        if (!thisOrder) {
          return {
            message: "Order is not difine!",
            resultCode: 0,
            statusCode: HttpStatus.BAD_REQUEST,
          };
        }
        const ofOrderId = thisOrder.orderId;
        await this.orderItemRepo.update(
          {
            ofOrderId,
          },
          {
            orderPayStatus: "PAID",
          }
        );
        /**
         * Uncheckout or failed delete order with orderCode
         */
      } else {
        await this.orderRepo.delete({ orderCode });
        return {
          message: "Delete successfull!",
          resultCode: 0,
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      return {
        message: "Update payStatus successfull!",
        resultCode: 1,
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      return { message: `${error}`, statusCode: 500, resultCode: 0 };
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
  async createPayMentLink(
    orderId: string,
    orderCode: number,
    orderItem: {
      orderTotalPrice: number;
      orderName: string;
      orderQuantity: number;
    },
    orderContact: {
      orderEmail: string;
      orderPhone: string;
      orderAddress: string;
    }
  ) {
    try {
      /**
       * leak all pavalue from parameter
       */
      const { orderName, orderQuantity, orderTotalPrice } = orderItem;
      const { orderAddress, orderEmail, orderPhone } = orderContact;
      /**
       * create expire for payment
       */
      const expiredAt = Math.floor(Date.now() / 1000) + 5 * 60;
      /**
       * set payload data
       */
      const payload: CreatePaymentLinkRequest = {
        orderCode: Number(orderCode),
        amount: Number(orderTotalPrice),
        description: `Thanh toán đơn hàng`,
        returnUrl: `http://localhost:3000/user`,
        cancelUrl: `http://localhost:3000/user`,
        items: [
          {
            name: orderName,
            price: orderTotalPrice,
            quantity: orderQuantity,
          },
        ],
        expiredAt,
        buyerEmail: orderEmail,
        buyerPhone: orderPhone,
        buyerAddress: orderAddress,
        signature: orderId,
      };
      const payment = await this.payosClient.paymentRequests.create(payload);
      return payment;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  // https://api.payos.com/v1/payment/cancel
  async cancelPaymentLink(paymentLinkId: string, cancellationReason?: string) {
    try {
      const response: { data: CancelPaymentResponse } = await axios.post(
        `${this.payosApiUrl}/${paymentLinkId}/cancel`,
        { cancellationReason },
        {
          headers: {
            "x-client-id": this.clientId,
            "x-api-key": this.apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const result: CancelPaymentResponse = response.data;
      const orderCode = result.data.orderCode;
      const deleteResult = await this.orderRepo.delete({
        orderCode: Number(orderCode),
      });
      if (!deleteResult.affected)
        return { message: "Can not delete order", resultCode: 0 };
      return { message: "successfull!", resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to cancel payment link, error:${error}`
      );
    }
  }
}
