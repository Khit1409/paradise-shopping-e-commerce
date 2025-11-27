import { CreateOrderDto } from '@/modules/domain/dto/order/order-create.dto';
import { OrderSqlRepository } from '@/modules/domain/repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '../domain/dto/order/order-response.dto';
import { GetOrderForSellerQuery } from '@/types/order/order.type';
import { NotificationRepository } from '../domain/repositories/notification.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderSqlRepository,
    private readonly notificationRepo: NotificationRepository,
  ) {}
  /**
   * Create new order
   * @param dto
   * @param user_id
   * @returns
   */
  async create(dto: CreateOrderDto, user_id: string) {
    const result = await this.orderRepo.create(dto, user_id);
    if (result.success) {
      await this.notificationRepo.create(
        'Bạn vừa có đơn hàng mới!',
        `Chúc mừng bạn vừa đặt thành công đơn hàng tại Paradise Shopping`,
        user_id,
      );
    }
    return result;
  }
  /**
   * get order for user by user id
   * @param user_id
   * @returns
   */
  async get(user_id: string): Promise<OrderResponseDto[]> {
    return await this.orderRepo.get(user_id);
  }
  /**
   * Get order for seller by seller id
   * @param seller_id
   * @returns
   */
  async getForSeller(
    seller_id: string,
    query: GetOrderForSellerQuery,
  ): Promise<OrderResponseDto[]> {
    return await this.orderRepo.getForSeller(seller_id, query);
  }
}
