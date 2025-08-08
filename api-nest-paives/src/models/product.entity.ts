import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './order_item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('decimal')
  price: number;

  @Column({ default: 0 })
  stock: number;

  @OneToMany(() => OrderItem, (item) => item.product)
  items: OrderItem[];
}
