import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({ type: "datetime2", nullable: false, default: new Date() })
  createdAt: Date;
  @Column({ type: "datetime2", default: new Date() })
  updatedAt: Date;
}
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
}
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
}
