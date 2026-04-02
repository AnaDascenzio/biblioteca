// LivroRepository.ts - Todas as operações com Livro no banco

import { AppDataSource } from '../database/dataSource';
import { Livro } from '../entities/livro';

// Repository = gerenciador de dados
export class LivroRepository {
  // Pega o repositório TypeORM do Livro
  private repository = AppDataSource.getRepository(Livro);

  public async criar(dados: Livro): Promise<Livro> {
    console.log('📝 Criando livro:', dados.titulo);

    // Cria uma instância de Livro com os dados
    const livro = this.repository.create(dados);

    // Salva no banco e retorna
    return await this.repository.save(livro);
  }

  // ===== READ (Ler) =====

  // Buscar TODOS os livros
  public async buscarTodos(): Promise<Livro[]> {
    console.log('📚 Buscando todos os livros...');

    return await this.repository.find({
      relations: ['editora'], // Carrega a editora junto
      order: { titulo: 'ASC' } // Ordena por título
    });
  }

  // Buscar UM livro por ID
  public async buscarPorId(id: string): Promise<Livro | null> {
    console.log(`🔍 Buscando livro com ID: ${id}`);

    return this.repository.findOne({
      where: { id },
      relations: ['editora']
    });
  }

  // Buscar livros por autor
  public async buscarPorAutor(autor: string): Promise<Livro[]> {
    console.log(`🔍 Buscando livros do autor: ${autor}`);

    return await this.repository.find({
      where: { autor },
      relations: ['editora']
    });
  }

  // ===== UPDATE (Atualizar) =====
  public async atualizar(
    id: string,
    dados: Partial<{
      titulo: string;
      autor: string;
      isbn: string;
    }>
  ): Promise<Livro | null> {
    console.log(`✏️ Atualizando livro com ID: ${id}`);

    // Atualiza no banco
    await this.repository.update(id, dados);

    // Retorna o livro atualizado
    return this.buscarPorId(id);
  }

  // ===== DELETE (Deletar) =====
  public async deletar(id: string): Promise<boolean> {
    console.log(`🗑️ Deletando livro com ID: ${id}`);

    // Tenta deletar
    const resultado = await this.repository.delete(id);

    // Se deletou pelo menos 1 registro, retorna true
    return resultado.affected ? resultado.affected > 0 : false;
  }
}