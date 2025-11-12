import { CreatePaymentLinkResponse } from '@payos/node';
import {
  CreateOrderVaritantDto,
  CreateOrderContactDto,
  CreateOrderDto,
  CreateOrderItemDto,
} from '@/dto/order/order-create.dto';
import { SendOrderMailDto } from '@/dto/order/send-order-mail.dto';
import { OrderVaritantDoc } from '@/schema/order-attribute.schema';
import { OrderResponseDto } from '@/modules/domain/dto/order/order-response.dto';
import { OrderItemOrmEntity } from '@/infrastructure/database/sql-server/order-item.entity';
import { OrderContactOrmEntity } from '@/infrastructure/database/sql-server/order-contact.entity';
import { GeneralHandleResponse } from './general.interface';

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
  ) => Promise<
    GeneralHandleResponse & { payment: CreatePaymentLinkResponse | null }
  >;
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
  ) => Promise<OrderContactOrmEntity>;
  /**
   * create order item
   * @param order_id
   * @param item
   * @returns
   */
  createItem: (
    order_id: string,
    item: CreateOrderItemDto,
  ) => Promise<OrderItemOrmEntity>;
  /**
   * get all order by user id
   * @param user_id
   * @returns
   */
  get: (user_id: string) => Promise<OrderResponseDto[]>;
}
