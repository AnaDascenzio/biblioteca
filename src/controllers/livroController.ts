// LivroController.ts - Controlador HTTP para Livro

import { Request, Response } from 'express';
import { LivroService } from '../services/livroService';

export class LivroController {
  private service: LivroService;

  constructor() {
    this.service = new LivroService();
  }

  // POST /api/livros
  public async criar(req: Request, res: Response): Promise<void> {
    try {
      console.log('Controller: POST /api/livros');

      // Extrai os dados do corpo da requisição
      const { titulo, autor, isbn, anoPublicacao, editoraId } = req.body;

      // Chama a service para criar
      const livro = await this.service.criar({
        titulo,
        autor,
        isbn,
        anoPublicacao,
        editoraId
      });

      // Retorna resposta com status 201 (Created)
      res.status(201).json({
        sucesso: true,
        mensagem: 'Livro criado com sucesso!',
        dados: livro
      });
    } catch (erro) {
      // Trata erros
      this.tratarErro(erro, res);
    }
  }

  // GET /api/livros
  async buscarTodos(req: Request, res: Response): Promise<void> {
    try {
      console.log('Controller: GET /api/livros');

      const livros = await this.service.buscarTodos();

      // Retorna resposta com status 200 (OK)
      res.status(200).json({
        sucesso: true,
        total: livros.length,
        dados: livros
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/livros/:id
  async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: GET /api/livros/${req.params.id}`);

      const { id } = req.params;
      const livro = await this.service.buscarPorId(id);

      res.status(200).json({
        sucesso: true,
        dados: livro
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/livros/autor/:autor
  async buscarPorAutor(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: GET /api/livros/autor/${req.params.autor}`);

      const { autor } = req.params;
      const livros = await this.service.buscarPorAutor(autor);

      res.status(200).json({
        sucesso: true,
        total: livros.length,
        dados: livros
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // PUT /api/livros/:id
  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: PUT /api/livros/${req.params.id}`);

      const { id } = req.params;
      const dados = req.body;

      const livroAtualizado = await this.service.atualizar(id, dados);

      res.status(200).json({
        sucesso: true,
        mensagem: 'Livro atualizado com sucesso!',
        dados: livroAtualizado
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // DELETE /api/livros/:id
  async deletar(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: DELETE /api/livros/${req.params.id}`);

      const { id } = req.params;
      await this.service.deletar(id);

      res.status(200).json({
        sucesso: true,
        mensagem: 'Livro deletado com sucesso!'
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  private tratarErro(erro: unknown, res: Response): void {
      console.error('erro:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: erro instanceof Error ? erro.message : 'Erro desconhecido'
      });
  }
}