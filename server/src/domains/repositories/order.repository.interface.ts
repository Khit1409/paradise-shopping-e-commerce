import { CreatePaymentLinkResponse } from '@payos/node';
import {
  CreateOrderVaritantDto,
  CreateOrderContactDto,
  CreateOrderDto,
  CreateOrderItemDto,
} from '../dto/order/order-create.dto';
import { SendOrderMailDto } from '../dto/order/send-order-mail.dto';
import { OrderResponseEntity } from '../entities/order.entity';
import { OrderVaritantDoc } from '@/infrastructure/database/mongoose/schemas/order-attribute.schema';

/**
 * interface of order repository
 */
export interface IOrderRepository {
  /**
   * Create new order
   * @param dto
   * @param user_id
   * @returns
   */
  create: (
    dto: CreateOrderDto,
    user_id: string,
  ) => Promise<{
    payment: CreatePaymentLinkResponse | null;
    resultCode: number;
  }>;
  /**
   * send order email
   * @param dto
   * @returns
   */
  sendMail: (dto: SendOrderMailDto) => Promise<void>;
  /**
   * creare order varitant
   * @param order_id
   * @param varitant
   * @returns
   */
  createVaritants: (
    order_id: string,
    varitant: CreateOrderVaritantDto,
  ) => Promise<OrderVaritantDoc>;
  /**
   * create order contact
   * @param order_id
   * @param contact
   * @returns
   */
  createContact: (
    order_id: string,
    contact: CreateOrderContactDto,
  ) => Promise<{
    ofOrderId: string;
    userOrder: string;
    orderAddress: string;
    orderEmail: string;
    orderPhone: string;
  }>;
  /**
   * create order item
   * @param order_id
   * @param item
   * @returns
   */
  createItem: (
    order_id: string,
    item: CreateOrderItemDto,
  ) => Promise<{
    ofOrderId: string;
    orderImg: string;
    orderQuantity: number;
    orderTotalPrice: number;
    orderKindOfPay: 'COD' | 'ONLINE';
    orderKindOfShipping: 'COD' | 'FLASH';
    orderName: string;
    proId: string;
    orderStatus: 'PENDING';
    orderPayStatus: 'UNPAID';
  }>;
  /**
   * get all order by user id
   * @param user_id
   * @returns
   */
  get: (user_id: string) => Promise<OrderResponseEntity[]>;
}
