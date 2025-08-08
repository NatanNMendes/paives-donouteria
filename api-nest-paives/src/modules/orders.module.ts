import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order_item.entity';
import { OrdersService } from '../services/orders.service';
import { OrdersController } from '../controllers/orders.controller';
import { ProductsModule } from './products.module';
import { StockModule } from './stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ProductsModule,
    StockModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

