// LivroService.ts - Lógica de negócio de Livro

import { Livro } from "../entities/livro";
import { LivroRepository } from "../repositories/livroRepository";
import { LivroValidator } from "./validator/livroValidator";


export class LivroService {
  private livroRepository: LivroRepository;
  private livroValidator: LivroValidator;

  constructor() {
    this.livroRepository = new LivroRepository();
    this.livroValidator = new LivroValidator();
  }

  public criar(livro: Partial<Livro>): Promise<Livro> {
    console.log('📝 Service: Criando livro com validações');

    this.livroValidator.validarDadosLivro(livro as Livro);
    return this.livroRepository.criar(livro as Livro);
  }

  public async buscarTodos(): Promise<Livro[]> {
    console.log('📚 Service: Buscando todos os livros');
    return await this.livroRepository.buscarTodos();
  }

  public async buscarPorId(id: string): Promise<Livro> {
    console.log(`🔍 Service: Buscando livro com ID ${id}`);

    const livro = await this.livroRepository.buscarPorId(id);

    if (!livro) {
      throw new Error(`Livro com ID ${id} não encontrado`);
    }

    return livro;
  }

  public async buscarPorAutor(autor: string): Promise<Livro[]> {
    return await this.livroRepository.buscarPorAutor(autor);
  }

  public async atualizar(
    id: string,
    dados: Partial<Livro>
  ): Promise<Livro | null> {
    console.log(`✏️ Service: Atualizando livro ${id}`);

    // Verifica se livro existe
    await this.buscarPorId(id);

    // Validações apenas se o campo foi fornecido
    if (dados.titulo !== undefined) {
      if (dados.titulo.length < 3) {
        throw new Error('Título deve ter no mínimo 3 caracteres');
      }
    }

    return await this.livroRepository.atualizar(id, dados);
  }

  public async deletar(id: string): Promise<void> {
    console.log(`🗑️ Service: Deletando livro ${id}`);

    // Verifica se livro existe
    const livro = await this.buscarPorId(id);

    const deletado = await this.livroRepository.deletar(id);

    if (!deletado) {
      throw new Error('Erro ao deletar livro');
    }

    console.log(`✅ Livro ${livro.titulo} deletado com sucesso`);
  }
}