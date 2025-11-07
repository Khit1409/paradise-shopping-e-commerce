import { CreateOrderDto } from '@/domains/dto/order/order-create.dto';
import { OrderService } from '@/services/order.service';
import type { JwtAuthGuardRequestType } from '@/types/auth.interface';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get()
  async getByUserId(@Req() req: JwtAuthGuardRequestType) {
    const { id } = req.user;
    return this.orderService.get(id);
  }
  @Post()
  async create(
    @Body() dto: CreateOrderDto,
    @Req() req: JwtAuthGuardRequestType,
  ) {
    const { id } = req.user;
    const result = await this.orderService.create(dto, id);
    if (result.resultCode !== 1) {
      throw new BadRequestException('Cant create new order!');
    }
    return result;
  }
}
