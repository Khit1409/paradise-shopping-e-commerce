import { CreateOrderDto } from '@/modules/domain/dto/order/order-create.dto';
import { OrderSqlRepository } from '@/modules/domain/repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '../domain/dto/order/order-response.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderSqlRepository) {}
  /**
   * Create new order
   * @param dto
   * @param user_id
   * @returns
   */
  async create(dto: CreateOrderDto, user_id: string) {
    return await this.orderRepo.create(dto, user_id);
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
  async getForSeller(seller_id: string): Promise<OrderResponseDto[]> {
    return await this.orderRepo.getForSeller(seller_id);
  }
}
