import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Livro } from '../entities/livro';
import { Editora } from '../entities/editora';

// Carrega variáveis do .env
dotenv.config();

// Cria a conexão com o banco
export const AppDataSource = new DataSource({
  type: 'postgres', // Tipo do banco
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'biblioteca_db',
  synchronize: true, // Auto-cria tabelas baseado nas entities
  logging: true, // Mostra as queries SQL no console
  entities: [Livro, Editora],
});

// Conectar ao banco
export async function conectarBanco() {
  try {
    await AppDataSource.initialize();
    console.log('Conectado ao PostgreSQL com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
    throw erro;
  }
}