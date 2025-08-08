import { DataSource } from 'typeorm';
import { User } from './models/user.entity';
import { Order } from './models/order.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Order],
  synchronize: false,
  logging: true,
  migrations: ['src/migrations/*.ts'],
});