import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsString, Matches} from 'class-validator';

import { Transform } from 'class-transformer';

export enum UserType {
  CLIENTE = 'cliente',
  EMPRESARIAL = 'empresarial',
}

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @Matches(/^\d{11,14}$/, {
    message: 'vat deve conter apenas números com 11 ou 14 dígitos'
  })
  vat: string;

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
