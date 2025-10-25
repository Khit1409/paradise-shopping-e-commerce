import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Cron, CronExpression } from "@nestjs/schedule";

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
  @Post("new_order")
  async createNewOderController(@Body() dto: CreateOrderDto, @Req() req) {
    const { userId } = req.user;
    const result = await this.ordersService.addNewOrderService(dto, userId);
    return result;
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ordersService.findOne(+id);
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
