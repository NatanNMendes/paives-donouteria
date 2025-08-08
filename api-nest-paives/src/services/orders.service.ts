import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../models/order.entity';
import { OrderItem } from '../models/order_item.entity';
import { CreateOrderDto } from '../dtos/create_order.dto';
import { User } from '../models/user.entity';
import { ProductsService } from '../services/products.service';
import { StockService } from '../services/stock.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private itemsRepo: Repository<OrderItem>,
    private productsService: ProductsService,
    private stockService: StockService,
  ) {}

  async createOrder(user: User, dto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.user = user;
    order.items = [];

    let total = 0;
    for (const i of dto.items) {
      const product = await this.productsService.findById(i.productId);
      if (product.stock < i.quantity) {
        throw new ForbiddenException(`Insufficient stock for product ${product.id}`);
      }
      const item = new OrderItem();
      item.product = product;
      item.order = order;
      item.quantity = i.quantity;
      item.price = product.price;
      total += product.price * i.quantity;
      order.items.push(item);
    }

    order.total = total;
    const saved = await this.ordersRepo.save(order);

    for (const i of dto.items) {
      await this.stockService.adjust(i.productId, -i.quantity, user);
    }

    return saved;
  }

  async getOrderById(user: User, orderId: number): Promise<Order> {
    const order = await this.ordersRepo.findOne({
      where: { id: orderId },
      relations: ['items', 'items.product', 'user'],
    });
    if (!order) throw new NotFoundException('Order not found');
    if (user.type !== 'empresarial' && order.user.id !== user.id) {
      throw new ForbiddenException('Access denied');
    }
    return order;
  }

  async listOrders(user: User): Promise<Order[]> {
    if (user.type === 'empresarial') {
      return this.ordersRepo.find({ relations: ['items', 'items.product', 'user'] });
    }
    return this.ordersRepo.find({
      where: { user: { id: user.id } },
      relations: ['items', 'items.product'],
    });
  }
}
