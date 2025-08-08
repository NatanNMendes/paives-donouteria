import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { ProductsModule } from './modules/products.module';
import { CartModule } from './modules/cart.module';
import { OrdersModule } from './modules/orders.module';
import { StockModule } from './modules/stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    StockModule,
  ],
})
export class AppModule {}
