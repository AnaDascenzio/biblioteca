// index.ts - Servidor Express

import 'reflect-metadata';
import express from 'express';
import { conectarBanco } from './database/dataSource';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3000;

// ===== MIDDLEWARES =====

// Middleware para parsear JSON
app.use(express.json());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`\n📨 ${req.method} ${req.path}`);
  next();
});

// ===== ROTAS =====

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: '✅ OK',
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api', routes);

// ===== INICIAR SERVIDOR =====

async function iniciar() {
  try {
    // Conectar ao banco
    await conectarBanco();
    console.log('Banco de dados conectado!\n');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}\n`);
      console.log('=== DOCUMENTAÇÃO DA API ===\n');
      
      console.log('LIVROS:');
      console.log(`  POST   http://localhost:${PORT}/api/livros`);
      console.log(`  GET    http://localhost:${PORT}/api/livros`);
      console.log(`  GET    http://localhost:${PORT}/api/livros/:id`);
      console.log(`  GET    http://localhost:${PORT}/api/livros/autor/:autor`);
      console.log(`  PUT    http://localhost:${PORT}/api/livros/:id`);
      console.log(`  DELETE http://localhost:${PORT}/api/livros/:id`);

      console.log('EDITORAS:');
      console.log(`  POST   http://localhost:${PORT}/api/editoras`);
      console.log(`  GET    http://localhost:${PORT}/api/editoras`);
      console.log(`  GET    http://localhost:${PORT}/api/editoras/:id`);
      console.log(`  GET    http://localhost:${PORT}/api/editoras/nome/:nome`);
      console.log(`  GET    http://localhost:${PORT}/api/editoras/:id/livros-count`);
      console.log(`  PUT    http://localhost:${PORT}/api/editoras/:id`);
      console.log(`  DELETE http://localhost:${PORT}/api/editoras/:id\n`);

      console.log('HEALTH CHECK:');
      console.log(`  GET    http://localhost:${PORT}/health`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar servidor:', erro);
    process.exit(1);
  }
}

iniciar();