import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateOrderAttribute, CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Orders } from "./entities/order.entity";
import { PaymentsService } from "src/payments/payments.service";
import { CreatePaymentLinkResponse } from "@payos/node";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "src/products/models/product.model";
import { Model, Types } from "mongoose";
import { EmailsService } from "src/emails/emails.service";
import {
  AddNewOrderResponse,
  SingleProductDataType,
} from "src/interfaces/server.types";
import { OrderPersonContacts } from "./entities/order-contact.entity";
import { OrderItems } from "./entities/order-item.entity";
import {
  OrderAttributeDoc,
  OrderAttributes,
} from "./models/order-attribute.model";
import { StoreEntity } from "src/seller/entity/store.entity";

@Injectable()
export class OrdersService {
  constructor(
    //other service
    private readonly emailService: EmailsService,
    private readonly paymentService: PaymentsService,
    //
    @InjectModel("Product") private readonly productModel: Model<Product>,
    @InjectModel("OrderAttribute")
    private readonly orderAttrModel: Model<OrderAttributeDoc>,
    @InjectRepository(Orders)
    private readonly orderRepo: Repository<Orders>,
    @InjectRepository(OrderPersonContacts)
    private readonly orderContactRepo: Repository<OrderPersonContacts>,
    @InjectRepository(OrderItems)
    private readonly orderItemRepo: Repository<OrderItems>,
    @InjectRepository(StoreEntity)
    private readonly storeRepo: Repository<StoreEntity>
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
  async addNewOrder(
    dto: CreateOrderDto,
    userId: string
  ): Promise<AddNewOrderResponse> {
    try {
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
      const {
        kindOfPay,
        kindOfShip,
        orderName,
        proId,
        quantity,
        totalPrice,
        orderImg,
      } = item;
      const attribute = dto.attribute;
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
       * create order parts
       */
      const { newOrderContact, newOrderItem } = await this.createOrderParts(
        orderId,
        kindOfPay,
        kindOfShip,
        orderName,
        quantity,
        totalPrice,
        proId,
        orderImg,
        address,
        phone,
        email,
        userName,
        attribute
      );
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
        "abc",
        orderCode,
        totalPrice
      );
      /**
       * check error when send email
       */

      if (sendMailResult.resultCode !== 1) {
        return { ...sendMailResult, payment: null };
      }
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

  /**
   * @description get user order by id from cookie
   * @param userId
   * @returns
   */
  async getOrdersByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestException("User id is invalid!");
    }
    try {
      const orders = await this.orderRepo.find({
        where: { ofUserId: userId },
        relations: ["orderItems", "orderContacts"],
      });
      const api = await Promise.all(
        orders.map(async (order) => {
          const data = await this.getOrderAttribute(order.orderId);
          return {
            ...order,
            orderAttribute: data,
          };
        })
      );
      return api;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async getOrderAttribute(orderId: string) {
    try {
      const api = await this.orderAttrModel
        .findOne({
          ofOrderId: orderId,
        })
        .then((data) => {
          if (data) {
            return data.attribute;
          }
        });
      return api;
    } catch (error) {
      return null;
    }
  }

  async createOrderParts(
    orderId: string,
    kindOfPay: "COD" | "ONLINE",
    kindOfShip: "COD" | "FLASH",
    orderName: string,
    quantity: number,
    totalPrice: number,
    proId: string,
    orderImg: string,
    orderAddress: string,
    orderPhone: string,
    orderEmail: string,
    userName: string,
    attribute: CreateOrderAttribute[]
  ) {
    try {
      /**
       * create new orderItem by orderId was create
       */
      const [newOrderItem, newOrderContact, newAttribute] = await Promise.all([
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
          orderImg,
        }),
        //contact
        this.orderContactRepo.save({
          ofOrderId: orderId,
          orderAddress,
          orderPhone,
          orderEmail,
          userOrder: userName,
        }),
        //attribute
        this.orderAttrModel.create({
          ofOrderId: orderId,
          attribute,
        }),
      ]);
      /**
       * check result create orderitem and order contact
       */
      if (!newOrderItem || !newOrderContact || !newAttribute) {
        throw new BadRequestException("Erro when create new order parts");
      }
      return { newOrderItem, newOrderContact, newAttribute };
    } catch (error) {
      throw new UnauthorizedException(`${error}`);
    }
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
