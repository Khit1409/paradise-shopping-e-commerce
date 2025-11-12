import { CreateOrderDto } from '@/modules/domain/dto/order/order-create.dto';
import { OrderSqlRepository } from '@/modules/domain/repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { OrderResponseDto } from '../domain/dto/order/order-response.dto';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderSqlRepository) {}
  async create(dto: CreateOrderDto, user_id: string) {
    return await this.repo.create(dto, user_id);
  }
  async get(user_id: string): Promise<OrderResponseDto[]> {
    return await this.repo.get(user_id);
  }
}
