import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly price: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  readonly stock: number;
}