import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Order table
 */
@Entity('Orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;
  @Column({ type: 'bigint', unique: true })
  orderCode: number;
  @Column({ type: 'uuid', nullable: false })
  ofStoreId: string;
  @Column({ type: 'uuid', nullable: false })
  ofUserId: string;
  @Column({ type: 'datetime2', nullable: false, default: new Date() })
  createdAt: Date;
  @Column({ type: 'datetime2', default: new Date() })
  updatedAt: Date;
}
