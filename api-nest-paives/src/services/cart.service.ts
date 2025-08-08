import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../models/carts.entity';
import { CartItem } from '../models/cart_items.entity';
import { Product } from '../models/product.entity';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getOrCreateCart(userId: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({ 
      where: { user: { id: userId } },
      relations: ['items', 'items.product']
    });

    if (cart) return cart;

    const newCart = this.cartRepo.create({ user: { id: userId } });
    return this.cartRepo.save(newCart);
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const product = await this.productRepo.findOne({ 
      where: { id: productId } 
    });
    
    if (!product) throw new NotFoundException('Produto não encontrado');
    if (product.stock < quantity) throw new BadRequestException('Estoque insuficiente');

    let item = cart.items.find(i => i.product.id === productId);
    
    if (item) {
      item.quantity += quantity;
    } else {
      item = this.cartItemRepo.create({ 
        product: { id: productId },
        quantity,
        cart
      });
      cart.items.push(item);
    }

    cart.total = cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );

    return this.cartRepo.save(cart);
  }

  async removeFromCart(userId: number, productId: number): Promise<Cart> {
    const cart = await this.getOrCreateCart(userId);
    const index = cart.items.findIndex(i => i.product.id === productId);
    
    if (index !== -1) {
      cart.items.splice(index, 1);
      cart.total = cart.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 
        0
      );
      return this.cartRepo.save(cart);
    }
    
    return cart;
  }

  async clearCart(userId: number): Promise<void> {
    const cart = await this.getOrCreateCart(userId);
    cart.items = [];
    cart.total = 0;
    await this.cartRepo.save(cart);
  }
}