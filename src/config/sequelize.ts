import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  storage: ':memory:',
});
