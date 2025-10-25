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
import { EmailsService } from "src/emails/emails.service";
import {
  AddNewOrderResponse,
  SingleProductDataType,
} from "src/interfaces/server.types";

@Injectable()
export class OrdersService {
  constructor(
    //other service
    private readonly emailService: EmailsService,
    private readonly paymentService: PaymentsService,
    //
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
    private readonly orderItemRepo: Repository<OrderItems>
  ) {}
  /**
   * auto delete order if created day is greeter than 100 day
   */
  async autoDeleteTimeOutOfOrder() {
    try {
      await this.orderRepo
        .createQueryBuilder()
        .delete()
        .from(Orders)
        .where("DATEDIFF(DAY, createdAt, GETDATE()) >= :maxDays", {
          maxDays: 1000,
        })
        .execute();
      console.log("Old orders cleaned up at", new Date());
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * create new order and create payment link if req from client have paymethod is online
   * @param dto
   * @param userId
   * @returns {AddNewOrderResponse}
   */
  async addNewOrderService(
    dto: CreateOrderDto,
    userId: string
  ): Promise<AddNewOrderResponse> {
    try {
      const start = Date.now();
      /**
       * check validate from request and
       * user id from token verified
       */
      if (!userId) {
        return {
          message: "User id is invalid!",
          payment: null,
          resultCode: 0,
          statusCode: 401,
        };
      }
      if (!dto || !dto.contact || !dto.item) {
        return {
          message: "Request is not enoungh!",
          payment: null,
          resultCode: 0,
          statusCode: 401,
        };
      }
      /**
       * leak all filed from dto
       */
      const { contact, item } = dto;
      const { address, email, phone, userName } = contact;
      const { kindOfPay, kindOfShip, orderName, proId, quantity, totalPrice } =
        item;
      /**
       * get storeId from product id in
       */
      const product = await this.productModel
        .findById(proId)
        .lean<SingleProductDataType>();

      if (!product) {
        return {
          message: "Product id is not define in database, could deleted!",
          resultCode: 0,
          statusCode: 401,
          payment: null,
        };
      }
      const { storeId } = product;
      /**
       * check validate storeId
       */
      if (!storeId) {
        return {
          message: "Do not know who is seller!",
          resultCode: 0,
          statusCode: 401,
          payment: null,
        };
      }
      /**
       * get store value
       */
      const store = await this.storeRepo.findOne({ where: { storeId } });
      /**
       * check validate store
       */
      if (!store) {
        return {
          message: "Store is not found",
          resultCode: 0,
          statusCode: 401,
          payment: null,
        };
      }
      /**
       * get store column
       */
      const { storeName } = store;
      /**
       * create new order
       */
      const newOrder = await this.orderRepo.save({
        ofUserId: userId,
        ofStoreId: storeId,
      });
      /**
       * check result create new order row
       */
      const order = await this.orderRepo.findOne({
        where: { orderId: newOrder.orderId },
      });
      if (!order) {
        return {
          message: "New order failed created! ",
          resultCode: 0,
          statusCode: 404,
          payment: null,
        };
      }
      /**
       * get new order column
       */
      const { orderId, orderCode } = order;
      /**
       * create new orderItem by orderId was create
       */
      const [newOrderItem, newOrderContact] = await Promise.all([
        //item
        this.orderItemRepo.save({
          ofOrderId: orderId,
          orderKindOfPay: kindOfPay,
          orderKindOfShipping: kindOfShip,
          orderPayStatus: "UNPAID",
          orderName: orderName,
          orderStatus: "PENDING",
          orderQuantity: quantity,
          orderTotalPrice: totalPrice,
          proId: proId,
        }),
        //contact
        this.orderContactRepo.save({
          ofOrderId: orderId,
          orderAddress: address,
          orderPhone: phone,
          orderEmail: email,
          userOrder: userName,
        }),
      ]);

      /**
       * check result create orderitem and order contact
       */
      if (!newOrderItem || !newOrderContact) {
        return {
          message: "New order item or contact is failed create!",
          resultCode: 0,
          statusCode: 404,
          payment: null,
        };
      }
      /**
       * set variable for get payment data
       */
      let payment: CreatePaymentLinkResponse | null = null;
      /**
       * check method pay
       */
      if (kindOfPay === "ONLINE") {
        const getPayment = await this.paymentService.createPayMentLink(
          orderId,
          orderCode,
          newOrderItem,
          newOrderContact
        );
        payment = getPayment;
      }
      /**
       * auto send email when successfull create order data
       */
      const sendMailResult = await this.emailService.sendOrderMail(
        email,
        userName,
        storeName,
        orderCode,
        totalPrice
      );
      /**
       * check error when send email
       */

      if (sendMailResult.resultCode !== 1) {
        return { ...sendMailResult, payment: null };
      }
      const end = Date.now();
      console.log(end - start, "ms");
      /**
       * response
       */
      return {
        message: "Successfull",
        resultCode: 1,
        payment,
        statusCode: 200,
      };
      /**
       * other error
       */
    } catch (error) {
      return {
        message: `${error}`,
        resultCode: 0,
        payment: null,
        statusCode: 500,
      };
    }
  }

  async getOrdersByUserId(userId: string) {
    try {
      const orders = await this.orderRepo.find({
        where: { ofUserId: userId },
        relations: ["orderItems", "orderContacts"],
      });
      return orders;
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
