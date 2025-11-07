import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

/**
 * Store entity
 * relation ship: 1-n with store banking
 */
@Entity('Stores')
export class StoreOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  storeId: string;
  @Column()
  storeName: string;
  @Column()
  storeAvatar: string;
  @Column()
  storeArea: string;
  @Column()
  storeAreaSlug: string;
  @Column()
  storeAddress: string;
  @Column()
  ownerId: string;
  @OneToMany(() => StoreBankingEntity, (banking) => banking.store, {
    cascade: true,
  })
  bankInfo: StoreBankingEntity[];
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
/**
 * Store banking information
 * relationship:n-1 store
 */
@Entity('StoreBanking')
@Unique(['bankNum'])
export class StoreBankingEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => StoreOrmEntity, (s) => s.bankInfo, { eager: true })
  @JoinColumn({ name: 'sellerId' })
  store: StoreOrmEntity;
  @Column({ nullable: false })
  bankName: string;
  @Column({ nullable: false })
  bankNum: string;
}
