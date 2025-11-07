import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Contact method of order
 */
@Entity('OrderPersonContacts')
export class OrderContactOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'nvarchar', length: 200, nullable: false })
  userOrder: string;
  @Column({ type: 'uuid', nullable: false })
  ofOrderId: string;
  @Column({ type: 'text', nullable: false })
  orderAddress: string;
  @Column({ type: 'char', length: 10, nullable: false })
  orderPhone: string;
  @Column({ type: 'nvarchar', length: 255, nullable: false })
  orderEmail: string;
}
