import { OrderService } from '@/services/order.service';
import type { JwtAuthGuardRequest } from '@/types/auth/auth.type';
import type { OrderRequest } from '@/types/order/order.type';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrderMapper } from '../mapper/order.mapper';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  /**
   * get order by owner id
   * @param req
   * @returns
   */
  @Get()
  async getByUserId(@Req() req: JwtAuthGuardRequest) {
    const { id } = req.user;
    return await this.orderService.get(id);
  }
  /**
   * add new order controller
   * @param param
   * @param req
   * @returns
   */
  @Post()
  async create(@Body() param: OrderRequest, @Req() req: JwtAuthGuardRequest) {
    const { id } = req.user;
    const dto = OrderMapper.formatOrderRequest(param);
    const result = await this.orderService.create(dto, id);
    return result;
  }
}
