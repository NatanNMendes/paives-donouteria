import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @Type(() => Number)
  productId: number;

  @Type(() => Number)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
