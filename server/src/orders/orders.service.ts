import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { StoreEntity } from "src/store/entity/store.entity";
import {
  OrderItems,
  OrderPersonContacts,
  Orders,
} from "./entities/order.entity";
import { PaymentsService } from "src/payments/payments.service";
import { CreatePaymentLinkResponse } from "@payos/node";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/models/product.model";
import { Model } from "mongoose";
/**
 * 1. add new order
 * 2. update order when corder modal open
 * 3. update order state, pay state
 */
@Injectable()
export class OrdersService {
  constructor(
    private readonly paymentService: PaymentsService,
    @InjectModel("Product") private readonly productModel: Model<Product>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>,
    @InjectRepository(Orders)
    private readonly orderRepo: Repository<Orders>,
    @InjectRepository(OrderPersonContacts)
    private readonly orderContactRepo: Repository<OrderPersonContacts>,
    @InjectRepository(OrderItems)
    private readonly orderItemRepo: Repository<OrderItems>,
  ) {}
  async addNewOrderService(dto: CreateOrderDto, userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException(
          "User is not login check again token or loggin state!",
        );
      }
      const storeId = await this.productModel
        .findById(dto.item.proId)
        .then((data) => {
          if (data) {
            return data.storeId;
          }
        });
      if (!storeId) {
        throw new BadRequestException("Do not know who is seller!");
      }
      const newOrder = await this.orderRepo.save({
        ofUserId: userId,
        ofStoreId: storeId,
      });
      if (!newOrder) {
        throw new BadRequestException("Can not create new order!");
      }
      const neworderId = newOrder.orderId;

      const newOrderItem = await this.orderItemRepo.insert({
        ofOrderId: neworderId,
        orderKindOfPay: dto.item.kindOfPay,
        orderKindOfShipping: dto.item.kindOfShip,
        orderPayStatus: "UNPAID",
        orderName: dto.item.orderName,
        orderStatus: "PENDING",
        orderQuantity: dto.item.quantity,
        orderTotalPrice: dto.item.totalPrice,
        proId: dto.item.proId,
      });
      if (!newOrderItem) {
        throw new BadRequestException("Order item can not create!");
      }
      const newOrderContact = await this.orderContactRepo.insert({
        ofOrderId: neworderId,
        orderAddress: dto.contact.address,
        orderPhone: dto.contact.phone,
        orderEmail: dto.contact.email,
        userOrder: dto.contact.userName,
      });
      if (!newOrderContact) {
        throw new BadRequestException("Can not create new order contact!");
      }
      let payment: CreatePaymentLinkResponse | null = null;
      if (dto.item.kindOfPay === "ONLINE") {
        const getPayment =
          await this.paymentService.createPayMentLink(neworderId);
        payment = getPayment;
      }
      return { message: "Successfull", resultCode: 1, payment };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} ${updateOrderDto.storeId} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
