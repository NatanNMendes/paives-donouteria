import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './carts.entity';
import { Product } from './product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.items, { 
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete'
  })
  cart: Cart;
}