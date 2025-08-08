import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './carts.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false })
  name: string;

  @Column({ name: 'vat_number', unique: true, nullable: false })
  vat: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column()
  type: 'cliente' | 'empresarial';

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToOne(() => Cart, cart => cart.user, { cascade: true })
  cart: Cart;
}
