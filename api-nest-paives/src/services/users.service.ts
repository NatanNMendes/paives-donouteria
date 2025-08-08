import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; 
import { CreateUserDto } from '../dtos/create_user.dto';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const cleanVat = this.cleanVat(dto.vat);
    const [existingEmail, existingVat] = await Promise.all([
      this.usersRepo.findOne({ where: { email: dto.email } }),
      cleanVat ? this.usersRepo.findOne({ where: { vat: cleanVat } }) : null
    ]);

    if (existingEmail) throw new ConflictException('Email já cadastrado');
    if (existingVat) throw new ConflictException('CPF/CNPJ já cadastrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ name: dto.name, vat: cleanVat, email: dto.email, password: hashed, type: dto.type });
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private cleanVat(vat: string): string {
    if (!vat) return '';
    return vat.replace(/\D/g, '');
  }
}

