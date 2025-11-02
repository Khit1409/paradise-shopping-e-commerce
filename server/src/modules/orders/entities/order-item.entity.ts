import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./order.entity";

/**
 * Detail of order
 */
@Entity("OrderItems")
export class OrderItems {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ type: "nvarchar", nullable: false, length: 200 })
  proId: string;
  @Column({ type: "uuid", nullable: false })
  ofOrderId: string;
  @Column({ type: "uuid", nullable: true })
  shipperId: string;
  @Column({ type: "nvarchar" })
  orderName: string;
  @Column({ type: "nvarchar" })
  orderImg: string;
  @Column({ type: "varchar" })
  orderStatus:
    | "PENDING"
    | "ACCEPTED"
    | "SHIPPING"
    | "RECEIVED"
    | "SHIPPINGFAILED";
  @Column({ type: "varchar" })
  orderKindOfShipping: "FLASH" | "COD";
  @Column({ type: "int", nullable: false })
  orderQuantity: number;
  @Column({ type: "varchar", nullable: false, default: "UNPAID" })
  orderPayStatus: "UNPAID" | "PAID";
  @Column({ type: "float", nullable: false })
  orderTotalPrice: number;
  @Column({ type: "varchar", nullable: false })
  orderKindOfPay: "COD" | "ONLINE";
  @OneToOne(() => Orders, (order) => order.orderItems)
  @JoinColumn({ name: "ofOrderId" })
  orders: Orders;
}
