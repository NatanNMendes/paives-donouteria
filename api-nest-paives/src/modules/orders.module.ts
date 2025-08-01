import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order-item.entity';
import { ProductsModule } from './products.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    UsersModule,
    ProductsModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
