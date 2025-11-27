import {
  CreateOrderContactDto,
  CreateOrderDto,
  CreateOrderItemDto,
  CreateOrderVaritantDto,
} from '@/domain/dto/order/order-create.dto';
import { IOrderRepository } from '@/interfaces/repositories/order.repository.interface';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderOrmEntity } from '@/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemOrmEntity } from '@/entities/order-item.entity';
import { OrderContactOrmEntity } from '@/entities/order-contact.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderVaritantDoc } from '@/schema/order-attribute.schema';
import { ProductDoc } from '@/schema/product.schema';
import { PaymentService } from '@/services/payments.service';
import { CreatePaymentLinkResponse } from '@payos/node';
import { SendOrderMailDto } from '@/domain/dto/order/send-order-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  OrderResponseDto,
  OrderVaritantResponseDto,
} from '../dto/order/order-response.dto';
import { OrderMapper } from '@/modules/mapper/order.mapper';
import { GeneralHandleResponse } from '@/interfaces/repositories/general.interface';
import { StoreOrmEntity } from '@/infrastructure/database/sql-server/store.entity';
import { GetOrderForSellerQuery } from '@/types/order/order.type';
/**
 * original handle database from schema or entity. using by service and using (mongoose or sql server) document
 * for query and response formated data to controller response to client
 */
@Injectable()
export class OrderSqlRepository implements IOrderRepository {
  constructor(
    // orm entity
    @InjectRepository(OrderOrmEntity)
    private readonly orderOrmRepo: Repository<OrderOrmEntity>,
    @InjectRepository(OrderItemOrmEntity)
    private readonly orderItemOrmRepo: Repository<OrderItemOrmEntity>,
    @InjectRepository(OrderContactOrmEntity)
    private readonly orderContactOrmRepo: Repository<OrderContactOrmEntity>,
    @InjectRepository(StoreOrmEntity)
    private readonly storeOrmRepo: Repository<StoreOrmEntity>,
    //modle
    @InjectModel('OrderVaritantModel')
    private readonly varitantModel: Model<OrderVaritantDoc>,
    @InjectModel('ProductModel')
    private readonly productModel: Model<ProductDoc>,
    //other service
    private readonly paymentService: PaymentService,
    private readonly mailerService: MailerService,
  ) {}
  /**
   * handle send email when success order.
   * @param dto
   */
  sendMail: (dto: SendOrderMailDto) => Promise<void> = async (dto) => {
    try {
      const { email, name, orderCode, price } = dto;
      await this.mailerService.sendMail({
        to: email,
        subject: name,
        template: 'order_email',
        context: {
          email,
          name,
          orderCode,
          price,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * Create new order contact sql
   * @param order_id
   * @param value
   */
  createContact: (
    order_id: string,
    contact: CreateOrderContactDto,
  ) => Promise<OrderContactOrmEntity> = async (order_id, contact) => {
    try {
      const { address, email, phone, user_name } = contact;
      const created = await this.orderContactOrmRepo.save({
        ofOrderId: order_id,
        userOrder: user_name,
        orderAddress: address,
        orderEmail: email,
        orderPhone: phone,
      });
      if (!created) {
        throw new NotFoundException('Can not create new order contact!');
      }
      return created;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  };
  /**
   * create new varitant mongodb
   * @param order_id
   * @param varitant
   */
  createVaritants: (
    order_id: string,
    varitant: CreateOrderVaritantDto,
  ) => Promise<OrderVaritantDoc> = async (order_id, varitant) => {
    try {
      const { sku, attributes } = varitant;
      const created = await this.varitantModel.create({
        order_id,
        sku,
        attributes,
      });
      if (!created) {
        throw new NotFoundException(`Can not create new order varitant`);
      }
      return created as OrderVaritantDoc;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  };
  /**
   * Create new order item sql
   * @param order_id
   * @param value
   */
  createItem: (
    order_id: string,
    item: CreateOrderItemDto,
  ) => Promise<OrderItemOrmEntity> = async (order_id, item) => {
    try {
      const created = await this.orderItemOrmRepo.save({
        ofOrderId: order_id,
        orderImg: item.img,
        orderQuantity: item.quantity,
        orderTotalPrice: item.total_price,
        orderKindOfPay: item.pay_type,
        orderKindOfShipping: item.shipping_type,
        orderName: item.name,
        proId: item.product_id,
        orderStatus: 'PENDING',
        orderPayStatus: 'UNPAID',
      });
      if (!created) {
        throw new NotFoundException(`Can not created new order items!`);
      }
      return created;
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  };
  /**
   * Create new order
   * @param dto
   * @param user_id
   * @returns
   */
  create: (
    dto: CreateOrderDto,
    user_id: string,
  ) => Promise<
    GeneralHandleResponse & { payment: CreatePaymentLinkResponse | null }
  > = async (dto, user_id) => {
    try {
      /**
       * leak object from dto
       */
      const { items, contacts, varitants } = dto;
      if (!user_id) {
        throw new UnauthorizedException(`user id is undifine!`);
      }
      /**
       * find product before add order , if product is null => product is not define
       * stop handle and throw exception
       */
      const product = await this.productModel.findById(items.product_id);
      if (!product) {
        return {
          payment: null,
          error: 'check product error',
          message: 'Product added is not define in database',
          success: true,
        };
      }
      /**
       * create parent table order
       */
      const newOrderData = {
        ofUserId: user_id,
        ofStoreId: product.owner_info.store_id,
      };
      const newOrder = await this.orderOrmRepo.save(newOrderData);
      /**
       * find after create for check result!
       */
      const order = await this.orderOrmRepo.findOne({
        where: { orderId: newOrder.orderId },
      });
      if (!order) {
        return {
          payment: null,
          error: 'save order error',
          message: 'Create new order is fail',
          success: false,
        };
      }
      //new order id (new created).
      const { orderId } = order;
      /**
       * create part of order (item, contact, attributes)
       */
      const [itemCreated, contactCreated, varitantCreated] = await Promise.all([
        this.createItem(orderId, items),
        this.createContact(orderId, contacts),
        this.createVaritants(orderId, varitants),
      ]);
      /**
       * remove order if a part of order cannot created
       */
      if (!itemCreated || !contactCreated || !varitantCreated) {
        await this.orderOrmRepo.delete({ orderId: order.orderId });
        return {
          payment: null,
          error: 'create part of order error',
          message: 'Create new order is fail',
          success: false,
        };
      }
      /**
       * check pay method if is online create payment link and response with result code
       */
      if (itemCreated.orderKindOfPay === 'ONLINE') {
        const { orderCode } = order;
        const { orderName, orderTotalPrice, orderQuantity } = itemCreated;
        const { orderPhone, orderAddress, orderEmail } = contactCreated;
        /**
         * create payment link
         */
        const payment = await this.paymentService.createPaymentLink({
          orderCode,
          item: {
            name: orderName,
            quantity: orderQuantity,
            totalPrice: orderTotalPrice,
          },
          contact: {
            email: orderEmail,
            phone: orderPhone,
            address: orderAddress,
          },
        });
        /**
         * create payment althourng error but still success create order
         */
        if (!payment) {
          /**
           * update kind of pay to COD if payment link is not created
           */
          await this.orderItemOrmRepo.update(
            { id: itemCreated.id },
            { orderKindOfPay: 'COD' },
          );
          return {
            payment: null,
            error: 'Create payment link errror',
            message: 'Create new order payment link is fail!',
            success: false,
          };
        }
        /**
         * return payment link and result if success create new order with method pay is online
         */
        return {
          payment,
          error: null,
          message: 'Create new order success',
          success: true,
        };
      }
      /**
       * response payment null if just pay code
       */
      return {
        payment: null,
        success: true,
        message: 'Create new order is success',
        error: null,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  /**
   * Get all order by user id
   * @param user_id
   * @returns
   */
  get: (user_id: string) => Promise<OrderResponseDto[]> = async (user_id) => {
    try {
      const orders = await this.orderOrmRepo.find({
        where: { ofUserId: user_id },
      });
      const api = await Promise.all(
        orders.map(async (order) => {
          const [varitant, item, contact, store] = await Promise.all([
            this.varitantModel
              .findOne({ order_id: order.orderId })
              .lean<OrderVaritantDoc>(),
            this.orderItemOrmRepo.findOne({
              where: { ofOrderId: order.orderId },
            }),
            this.orderContactOrmRepo.findOne({
              where: { ofOrderId: order.orderId },
            }),
            this.storeOrmRepo.findOne({
              where: {
                storeId: order.ofStoreId,
              },
            }),
          ]);

          return {
            id: order.orderId,
            store_info: {
              store_name: store.storeName,
            },
            varitants: varitant
              ? OrderMapper.formatOrderVaritantResponse(varitant)
              : null,
            items: item ? OrderMapper.formatOrderItemResponse(item) : null,
            contacts: contact
              ? OrderMapper.formatOrderContactResponse(contact)
              : null,
            created_at: order.createdAt,
          };
        }),
      );

      return OrderMapper.formatOrderResponse(api);
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };

  /**
   * get order for seller manager page
   */
  getForSeller: (
    seller_id: string,
    dto: GetOrderForSellerQuery,
  ) => Promise<OrderResponseDto[]> = async (seller_id, dto) => {
    try {
      const store = await this.storeOrmRepo.findOne({
        where: { ownerId: seller_id },
        order: dto.sort === 'date' ? { createdAt: 'DESC' } : {},
      });
      const orders = await this.orderOrmRepo.find({
        where: {
          ofStoreId: store.storeId,
        },
      });
      let data: OrderResponseDto[] = await Promise.all(
        orders.map(async (order) => {
          const [orderItems, orderContacts, varitants] = await Promise.all([
            this.orderItemOrmRepo.findOne({
              where: {
                ofOrderId: order.orderId,
              },
            }),
            this.orderContactOrmRepo.findOne({
              where: {
                ofOrderId: order.orderId,
              },
            }),
            this.varitantModel
              .findOne({
                order_id: order.orderId,
              })
              .select('-__v -_id -order_id')
              .lean<OrderVaritantResponseDto>(),
          ]);
          return {
            id: order.orderId.toLowerCase(),
            store_info: {
              store_name: store.storeName,
            },
            items: {
              img: orderItems.orderImg,
              name: orderItems.orderName,
              shipping_type: orderItems.orderKindOfShipping,
              status: orderItems.orderStatus,
              pay_type: orderItems.orderKindOfPay,
              pay_state: orderItems.orderPayStatus,
              quantity: orderItems.orderQuantity,
              total_price: orderItems.orderTotalPrice,
              product_id: orderItems.proId,
            },
            contacts: {
              address: orderContacts.orderAddress,
              email: orderContacts.orderEmail,
              phone: orderContacts.orderPhone,
              user_name: orderContacts.userOrder,
            },
            varitants,
            created_at: new Date(store.createdAt),
          };
        }),
      );
      const { sort, ship_type, status, pay_state, pay_type } = dto;
      if (sort && sort === 'date') {
        data = data.sort((a, b) => b.items.total_price - a.items.total_price);
      }
      if (ship_type) {
        data = data.filter((db) => db.items.shipping_type === ship_type);
      }
      if (status) {
        data = data.filter((db) => db.items.status === status);
      }
      if (pay_state) {
        data = data.filter((db) => db.items.pay_state === pay_state);
      }
      if (pay_type) {
        data = data.filter((db) => db.items.pay_type === pay_type);
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
}
