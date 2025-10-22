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
import { CancelPaymentResponse } from "src/interfaces/payment";
import {
  OrderItems,
  OrderPersonContacts,
  Orders,
} from "src/orders/entities/order.entity";
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
      console.log("Raw webhook body:", body);
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
   *
   * @param orderId
   * @returns
   */
  async createPayMentLink(orderId: string) {
    try {
      const order = await this.orderRepo.findOne({ where: { orderId } });
      if (!order) throw new BadRequestException("Order not found");

      const orderItem = await this.orderItemRepo.findOne({
        where: { ofOrderId: orderId },
      });
      if (!orderItem) throw new BadRequestException("Order item not found");
      const orderContact = await this.orderContactRepo.findOne({
        where: { ofOrderId: orderId },
      });
      if (!orderContact) {
        throw new BadRequestException("Order contact not found");
      }

      const expiredAt = Math.floor(Date.now() / 1000) + 5 * 60;

      const payload: CreatePaymentLinkRequest = {
        orderCode: Number(order.orderCode),
        amount: Number(orderItem.orderTotalPrice),
        description: `Thanh toán đơn hàng`,
        returnUrl: `http://localhost:3000/user`,
        cancelUrl: `http://localhost:3000/user`,
        items: [
          {
            name: orderItem.orderName,
            price: orderItem.orderTotalPrice,
            quantity: orderItem.orderQuantity,
          },
        ],
        expiredAt,
        buyerEmail: orderContact.orderEmail,
        buyerPhone: orderContact.orderPhone,
        buyerAddress: orderContact.orderAddress,
        signature: order.orderId,
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
