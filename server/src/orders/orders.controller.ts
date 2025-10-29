import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Cron, CronExpression } from "@nestjs/schedule";
import type { Response } from "express";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /**
   * auto delete order have day >=100
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async autoDeleteItemOutOfOrder() {
    await this.ordersService.autoDeleteTimeOutOfOrder();
  }
  /**
   *
   * @param dto
   * @param req
   * @returns
   */
  @Post("")
  async createNewOder(@Body() dto: CreateOrderDto, @Req() req) {
    const { userId } = req.user;
    const result = await this.ordersService.addNewOrder(dto, userId);
    return result;
  }

  @Get("")
  async getUserOrder(@Req() req) {
    const { userId } = req.user;
    const result = await this.ordersService.getOrdersByUserId(userId);
    return result;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ordersService.remove(+id);
  }
}
