import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export enum UserType {
  CLIENTE = 'cliente',
  EMPRESARIAL = 'empresarial',
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @IsEnum(UserType)
  readonly type: UserType;
}
