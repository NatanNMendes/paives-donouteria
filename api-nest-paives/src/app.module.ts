import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../src/modules/users.module';
import { AuthModule } from './modules/auth.module';
import { ProductsModule } from '../src/modules/products.module';
import { OrdersModule } from '../src/modules/orders.module';
import { StockModule } from '../src/modules/stock.module';

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
    OrdersModule,
    StockModule,
  ],
})
export class AppModule {}
