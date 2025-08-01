import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '../utils/order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.AWAITING_PAYMENT })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total: number;
}
