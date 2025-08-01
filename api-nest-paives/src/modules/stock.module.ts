// src/modules/stock.module.ts
import { Module } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { ProductsModule } from '../modules/products.module';

@Module({
  imports: [ProductsModule],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}