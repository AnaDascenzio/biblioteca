// EditoraController.ts - Controlador HTTP para Editora

import { Request, Response } from 'express';
import { EditoraService } from '../services/editoraService';

export class EditoraController {
  private service: EditoraService;

  constructor() {
    this.service = new EditoraService();
  }

  // ===== CREATE =====
  // POST /api/editoras
  public async criar(req: Request, res: Response): Promise<void> {
    try {
      console.log('Controller: POST /api/editoras');

      const { nome, endereco } = req.body;

      const editora = await this.service.criar({
        nome,
        endereco
      });

      res.status(201).json({
        sucesso: true,
        mensagem: 'Editora criada com sucesso!',
        dados: editora
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/editoras
  public async buscarTodas(req: Request, res: Response): Promise<void> {
    try {
      console.log('Controller: GET /api/editoras');

      const editoras = await this.service.buscarTodas();

      res.status(200).json({
        sucesso: true,
        total: editoras.length,
        dados: editoras
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/editoras/:id
  public async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: GET /api/editoras/${req.params.id}`);

      const { id } = req.params;
      const editora = await this.service.buscarPorId(id);

      res.status(200).json({
        sucesso: true,
        dados: editora
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/editoras/nome/:nome
  public async buscarPorNome(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: GET /api/editoras/nome/${req.params.nome}`);

      const { nome } = req.params;
      const editoras = await this.service.buscarPorNome(nome);

      res.status(200).json({
        sucesso: true,
        total: editoras.length,
        dados: editoras
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // PUT /api/editoras/:id
  public async atualizar(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: PUT /api/editoras/${req.params.id}`);

      const { id } = req.params;
      const dados = req.body;

      const editoraAtualizada = await this.service.atualizar(id, dados);

      res.status(200).json({
        sucesso: true,
        mensagem: 'Editora atualizada com sucesso!',
        dados: editoraAtualizada
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // DELETE /api/editoras/:id
  public async deletar(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: DELETE /api/editoras/${req.params.id}`);

      const { id } = req.params;
      await this.service.deletar(id);

      res.status(200).json({
        sucesso: true,
        mensagem: 'Editora deletada com sucesso!'
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  // GET /api/editoras/:id/livros-count
  public async contarLivros(req: Request, res: Response): Promise<void> {
    try {
      console.log(`Controller: GET /api/editoras/${req.params.id}/livros-count`);

      const { id } = req.params;
      const total = await this.service.contarLivros(id);

      res.status(200).json({
        sucesso: true,
        editoraId: id,
        totalLivros: total
      });
    } catch (erro) {
      this.tratarErro(erro, res);
    }
  }

  private tratarErro(erro: unknown, res: Response): void {
      console.error('Erro:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno do servidor'
      });
  }
}