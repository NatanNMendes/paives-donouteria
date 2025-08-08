import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart_items.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, item => item.cart, { cascade: true })
  items: CartItem[];

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  total: number;
}