import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserType } from '../dtos/create-user.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../models/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(
    @Body() dto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return this.productsService.create(dto, user);
  }
}
