import { OrderFinishedHandle, OrderRequest } from '@/types/order/order.type';
import {
  OrderContactResponseDto,
  OrderItemResponseDto,
  OrderResponseDto,
  OrderVaritantResponseDto,
} from '../domain/dto/order/order-response.dto';
import { OrderItemOrmEntity } from '@/infrastructure/database/sql-server/order-item.entity';
import { OrderContactOrmEntity } from '@/infrastructure/database/sql-server/order-contact.entity';
import { OrderVaritantDoc } from '@/infrastructure/database/mongoodb/order-attribute.schema';
import { CreateOrderDto } from '../domain/dto/order/order-create.dto';

export class OrderMapper {
  /**
   * format order list
   * @param res
   * @returns
   */
  static formatOrderResponse(res: OrderFinishedHandle[]): OrderResponseDto[] {
    return res.map(
      (res) =>
        new OrderResponseDto({
          id: res.id.toLowerCase(),
          store_info: res.store_info,
          items: {
            ...res.items,
            product_id: res.items.product_id.toString(),
          },
          contacts: res.contacts,
          varitants: res.varitants,
          created_at: res.created_at,
        }),
    );
  }
  /**
   * format order item
   * @param res
   * @returns
   */
  static formatOrderItemResponse(
    res: OrderItemOrmEntity,
  ): OrderItemResponseDto {
    return new OrderItemResponseDto({
      img: res.orderImg,
      name: res.orderName,
      quantity: res.orderQuantity,
      pay_state: res.orderPayStatus,
      pay_type: res.orderKindOfPay,
      total_price: res.orderTotalPrice,
      status: res.orderStatus,
      product_id: res.proId,
      shipping_type: res.orderKindOfShipping,
    });
  }
  /**
   * format order contact
   * @param res
   * @returns
   */
  static formatOrderContactResponse(
    res: OrderContactOrmEntity,
  ): OrderContactResponseDto {
    return new OrderContactResponseDto({
      address: res.orderAddress,
      phone: res.orderPhone,
      email: res.orderEmail,
      user_name: res.userOrder,
    });
  }
  /**
   * Format order varitant before response
   * @param res
   * @returns
   */
  static formatOrderVaritantResponse(
    res: OrderVaritantDoc,
  ): OrderVaritantResponseDto {
    return new OrderVaritantResponseDto({
      attributes: res.attributes,
      sku: res.sku,
    });
  }
  /**
   * format order request for create new order.
   */
  static formatOrderRequest(req: OrderRequest): CreateOrderDto {
    return new CreateOrderDto({
      varitants: req.varitants,
      contacts: req.contacts,
      items: req.items,
    });
  }
}
