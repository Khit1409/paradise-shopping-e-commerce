import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./order.entity";

/**
 * Contact method of order
 */
@Entity("OrderPersonContacts")
export class OrderPersonContacts {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", length: 200, nullable: false })
  userOrder: string;
  @Column({ type: "uuid", nullable: false })
  ofOrderId: string;
  @Column({ type: "text", nullable: false })
  orderAddress: string;
  @Column({ type: "char", length: 10, nullable: false })
  orderPhone: string;
  @Column({ type: "nvarchar", length: 255, nullable: false })
  orderEmail: string;
  @OneToOne(() => Orders, (order) => order.orderItems)
  @JoinColumn({ name: "ofOrderId" })
  orders: Orders;
}
