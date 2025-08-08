// cart.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from '../controllers/add_to_cart.controller';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/carts.entity';
import { CartItem } from '../models/cart_items.entity';
import { Product } from '../models/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}