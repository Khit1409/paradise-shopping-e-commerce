import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItems } from "./order-item.entity";
import { OrderPersonContacts } from "./order-contact.entity";

/**
 * Order table
 */
@Entity("Orders")
export class Orders {
  @PrimaryGeneratedColumn("uuid")
  orderId: string;
  @Column({ type: "bigint", unique: true })
  orderCode: number;
  @Column({ type: "uuid", nullable: false })
  ofStoreId: string;
  @Column({ type: "uuid", nullable: false })
  ofUserId: string;
  @OneToOne(() => OrderItems, (item) => item.orders, {
    cascade: true,
    onDelete: "CASCADE",
  })
  orderItems: OrderItems;
  @OneToOne(() => OrderPersonContacts, (contact) => contact.orders, {
    cascade: true,
    onDelete: "CASCADE",
  })
  orderContacts: OrderPersonContacts;
  @Column({ type: "datetime2", nullable: false, default: new Date() })
  createdAt: Date;
  @Column({ type: "datetime2", default: new Date() })
  updatedAt: Date;
}
