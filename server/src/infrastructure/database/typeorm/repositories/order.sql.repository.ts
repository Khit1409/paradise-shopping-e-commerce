import {
  CreateOrderContactDto,
  CreateOrderDto,
  CreateOrderItemDto,
  CreateOrderVaritantDto,
} from '@/domains/dto/order/order-create.dto';
import { IOrderRepository } from '@/domains/repositories/order.repository.interface';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderOrmEntity } from '../entities/order.sql.entity';
import { Repository } from 'typeorm';
import { OrderItemOrmEntity } from '../entities/order-item.sql.entity';
import { OrderContactOrmEntity } from '../entities/order-contact.sql.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderVaritantDoc } from '../../mongoose/schemas/order-attribute.schema';
import { ProductDoc } from '../../mongoose/schemas/product.schema';
import { PaymentService } from '@/services/payments.service';
import { CreatePaymentLinkResponse } from '@payos/node';
import { SendOrderMailDto } from '@/domains/dto/order/send-order-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  OrderResponseEntity,
  OrderVaritantEnitity,
} from '@/domains/entities/order.entity';

@Injectable()
export class OrderSqlRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderOrmRepo: Repository<OrderOrmEntity>,
    @InjectRepository(OrderItemOrmEntity)
    private readonly orderItemOrmRepo: Repository<OrderItemOrmEntity>,
    @InjectRepository(OrderContactOrmEntity)
    private readonly orderContactOrmRepo: Repository<OrderContactOrmEntity>,
    @InjectModel('OrderVaritantModel')
    private readonly varitantModel: Model<OrderVaritantDoc>,
    @InjectModel('ProductModel')
    private readonly productModel: Model<ProductDoc>,
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
      console.log('Da gui email cho user');
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
  ) => Promise<{
    ofOrderId: string;
    userOrder: string;
    orderAddress: string;
    orderEmail: string;
    orderPhone: string;
  }> = async (order_id, contact) => {
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
  ) => Promise<{
    ofOrderId: string;
    orderImg: string;
    orderQuantity: number;
    orderTotalPrice: number;
    orderKindOfPay: 'COD' | 'ONLINE';
    orderKindOfShipping: 'COD' | 'FLASH';
    orderName: string;
    proId: string;
    orderStatus: 'PENDING';
    orderPayStatus: 'UNPAID';
  }> = async (order_id, item) => {
    try {
      const {
        img,
        name,
        pay_type,
        product_id,
        quantity,
        shipping_type,
        total_price,
      } = item;
      const created = await this.orderItemOrmRepo.save({
        ofOrderId: order_id,
        orderImg: img,
        orderQuantity: quantity,
        orderTotalPrice: total_price,
        orderKindOfPay: pay_type,
        orderKindOfShipping: shipping_type,
        orderName: name,
        proId: product_id,
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
  ) => Promise<{
    payment: CreatePaymentLinkResponse | null;
    resultCode: number;
  }> = async (dto, user_id) => {
    try {
      const { item, contact, varitant } = dto;
      if (!user_id) {
        throw new UnauthorizedException(`user id is undifine!`);
      }
      /**
       * find product before add order , if product is null => product is not define
       * stop handle and throw exception
       */
      const product = await this.productModel.findById(item.product_id);
      if (!product) {
        throw new BadRequestException(
          `product added with id ${item.product_id} is not define in database`,
        );
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
        throw new NotFoundException(`error create new order rows! 404`);
      }
      const { orderId } = order;
      /**
       * create part of order (item, contact, attributes)
       */
      const [itemCreated, contactCreated] = await Promise.all([
        this.createItem(orderId, item),
        this.createContact(orderId, contact),
        this.createVaritants(orderId, varitant),
      ]);
      /**
       * check pay method if is online create payment link and response with result code
       */
      if (itemCreated.orderKindOfPay === 'ONLINE') {
        const { orderCode } = order;
        const { orderName, orderTotalPrice, orderQuantity } = itemCreated;
        const { orderPhone, orderAddress, orderEmail } = contactCreated;
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
        if (!payment) {
          throw new NotFoundException('Cant create payment link!');
        }
        return { payment, resultCode: 1 };
      }
      return { payment: null, resultCode: 1 };
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
  get: (user_id: string) => Promise<OrderResponseEntity[]> = async (
    user_id,
  ) => {
    try {
      const orders = await this.orderOrmRepo.find({
        where: { ofUserId: user_id },
      });
      const api: OrderResponseEntity[] = [];
      for (const order of orders) {
        const [varitant, item, contact] = await Promise.all([
          this.varitantModel
            .findOne({
              order_id: order.orderId,
            })
            .select('-order_id -_id -__v')
            .lean<OrderVaritantEnitity>(),
          this.orderItemOrmRepo.findOne({
            where: { ofOrderId: order.orderId },
          }),
          this.orderContactOrmRepo.findOne({
            where: { ofOrderId: order.orderId },
          }),
        ]);
        const {
          orderImg,
          orderName,
          orderStatus,
          orderKindOfPay,
          orderKindOfShipping,
          orderQuantity,
          proId,
          orderTotalPrice,
          orderPayStatus,
        } = item;
        const { userOrder, orderAddress, orderPhone, orderEmail } = contact;
        api.push({
          id: order.orderId,
          varitants: varitant,
          items: {
            img: orderImg,
            name: orderName,
            status: orderStatus,
            shipping_type: orderKindOfShipping,
            pay_type: orderKindOfPay,
            pay_state: orderPayStatus,
            quantity: orderQuantity,
            product_id: proId,
            total_price: orderTotalPrice,
          },
          contacts: {
            address: orderAddress,
            email: orderEmail,
            phone: orderPhone,
            user_name: userOrder,
          },
          created_at: order.createdAt,
        });
      }
      return api.map((doc) => new OrderResponseEntity(doc));
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
  };
}
