import { CreateOrderDto } from '@/domains/dto/order/order-create.dto';
import { OrderResponseEntity } from '@/domains/entities/order.entity';
import { OrderSqlRepository } from '@/infrastructure/database/typeorm/repositories/order.sql.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly repo: OrderSqlRepository) {}
  async create(dto: CreateOrderDto, user_id: string) {
    return await this.repo.create(dto, user_id);
  }
  async get(user_id: string): Promise<OrderResponseEntity[]> {
    return await this.repo.get(user_id);
  }
}
