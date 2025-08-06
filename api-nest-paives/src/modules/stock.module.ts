import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockService } from '../services/stock.service';
import { ProductsModule } from '../modules/products.module';

@Module({
  imports: [ProductsModule],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
