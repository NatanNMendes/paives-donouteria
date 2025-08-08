import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from '../services/cart.service';
import { AddToCartDto } from '../dtos/add_to_cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Req() req,
    @Body() dto: AddToCartDto
  ) {

    const productId = Number(dto.productId);
    
    return this.cartService.addToCart(
      req.user.id,
      productId,
      dto.quantity
    );
  }
}