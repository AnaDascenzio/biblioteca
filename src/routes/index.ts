import { Router } from 'express';
import { LivroController } from '../controllers/livroController';
import { EditoraController } from '../controllers/editoraController';

const router = Router();

const livroController = new LivroController();
const editoraController = new EditoraController();

// POST /api/livros - Criar livro
router.post('/livros', (req, res) => livroController.criar(req, res));

// GET /api/livros - Listar todos
router.get('/livros', (req, res) => livroController.buscarTodos(req, res));


// GET /api/livros/autor/:autor - Por autor
router.get('/livros/autor/:autor', (req, res) =>
  livroController.buscarPorAutor(req, res)
);

// GET /api/livros/:id - Por ID
router.get('/livros/:id', (req, res) =>
  livroController.buscarPorId(req, res)
);

// PUT /api/livros/:id - Atualizar
router.put('/livros/:id', (req, res) =>
  livroController.atualizar(req, res)
);

// DELETE /api/livros/:id - Deletar
router.delete('/livros/:id', (req, res) =>
  livroController.deletar(req, res)
);

// ===== ROTAS DE EDITORA =====

// POST /api/editoras - Criar editora
router.post('/editoras', (req, res) =>
  editoraController.criar(req, res)
);

// GET /api/editoras - Listar todas
router.get('/editoras', (req, res) =>
  editoraController.buscarTodas(req, res)
);

// GET /api/editoras/nome/:nome - Por nome
router.get('/editoras/nome/:nome', (req, res) =>
  editoraController.buscarPorNome(req, res)
);

// GET /api/editoras/:id - Por ID
router.get('/editoras/:id', (req, res) =>
  editoraController.buscarPorId(req, res)
);

// GET /api/editoras/:id/livros-count - Contar livros
router.get('/editoras/:id/livros-count', (req, res) =>
  editoraController.contarLivros(req, res)
);

// PUT /api/editoras/:id - Atualizar
router.put('/editoras/:id', (req, res) =>
  editoraController.atualizar(req, res)
);

// DELETE /api/editoras/:id - Deletar
router.delete('/editoras/:id', (req, res) =>
  editoraController.deletar(req, res)
);

export default router;