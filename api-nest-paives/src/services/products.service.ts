import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';
import { CreateProductDto } from '../dtos/create_product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepo.find();
  }

  async findById(id: number): Promise<Product> {
    const prod = await this.productsRepo.findOne({ where: { id } });
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  async create(dto: CreateProductDto, user: User): Promise<Product> {
    if (user.type !== 'empresarial') throw new ForbiddenException();
    const product = this.productsRepo.create({ name: dto.name, description: dto.description, price: dto.price, stock: dto.stock });
    return this.productsRepo.save(product);
  }
}
