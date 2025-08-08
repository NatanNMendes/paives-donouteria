import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create_product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../models/user.entity';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @Roles('empresarial')
  create(@Body() dto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
