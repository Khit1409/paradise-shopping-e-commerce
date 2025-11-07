import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Detail of order
 */
@Entity('OrderItems')
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'nvarchar', nullable: false, length: 200 })
  proId: string;
  @Column({ type: 'uuid', nullable: false })
  ofOrderId: string;
  @Column({ type: 'uuid', nullable: true })
  shipperId: string;
  @Column({ type: 'nvarchar' })
  orderName: string;
  @Column({ type: 'nvarchar' })
  orderImg: string;
  @Column({ type: 'varchar' })
  orderStatus:
    | 'PENDING'
    | 'ACCEPTED'
    | 'SHIPPING'
    | 'RECEIVED'
    | 'SHIPPINGFAILED';
  @Column({ type: 'varchar' })
  orderKindOfShipping: 'FLASH' | 'COD';
  @Column({ type: 'int', nullable: false })
  orderQuantity: number;
  @Column({ type: 'varchar', nullable: false, default: 'UNPAID' })
  orderPayStatus: 'UNPAID' | 'PAID';
  @Column({ type: 'float', nullable: false })
  orderTotalPrice: number;
  @Column({ type: 'varchar', nullable: false })
  orderKindOfPay: 'COD' | 'ONLINE';
}
