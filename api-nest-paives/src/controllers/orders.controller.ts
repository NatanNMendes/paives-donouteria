import { Controller, Post, Get, Param, UseGuards, Body } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from '../dtos/create_order.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../models/user.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @GetUser() user: User,
    @Body() dto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(user, dto);
  }

  @Get(':id')
  getOrder(@GetUser() user: User, @Param('id') id: string) {
    return this.ordersService.getOrderById(user, +id);
  }

  @Get()
  listOrders(@GetUser() user: User) {
    return this.ordersService.listOrders(user);
  }
}
