import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { User } from '../models/user.entity';

@Injectable()
export class StockService {
  constructor(private productsService: ProductsService) {}

  async adjust(productId: number, delta: number, user: User) {
    if (user.type !== 'empresarial') throw new ForbiddenException();
    const product = await this.productsService.findById(productId);
    product.stock = product.stock + delta;
    if (product.stock < 0) product.stock = 0;
    return this.productsService['productsRepo'].save(product);
  }
}
