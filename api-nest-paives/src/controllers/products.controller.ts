import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../models/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  @Post()
  @Roles('empresarial')
  create(@Body() dto: CreateProductDto, @GetUser() user: User) {
    return this.productsService.create(dto, user);
  }
}

