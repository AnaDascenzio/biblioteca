import { AppDataSource } from '../database/dataSource';
import { Livro } from '../entities/livro';

export class LivroRepository {

  private repository = AppDataSource.getRepository(Livro);

  public async criar(dados: Livro): Promise<Livro> {
    console.log('Criando livro:', dados.titulo);

    const livro = this.repository.create(dados);

    return await this.repository.save(livro);
  }

  public async buscarTodos(): Promise<Livro[]> {
    console.log('Buscando todos os livros...');

    return await this.repository.find({
      relations: ['editora'],
      order: { titulo: 'ASC' }
    });
  }

  public async buscarPorId(id: string): Promise<Livro | null> {
    console.log(` Buscando livro com ID: ${id}`);

    return this.repository.findOne({
      where: { id },
      relations: ['editora']
    });
  }

  public async buscarPorAutor(autor: string): Promise<Livro[]> {
    console.log(`Buscando livros do autor: ${autor}`);

    return await this.repository.find({
      where: { autor },
      relations: ['editora']
    });
  }

  public async atualizar(
    id: string,
    dados: Partial<{
      titulo: string;
      autor: string;
      isbn: string;
    }>
  ): Promise<Livro | null> {
    console.log(`Atualizando livro com ID: ${id}`);

    await this.repository.update(id, dados);

    return this.buscarPorId(id);
  }

  public async deletar(id: string): Promise<boolean> {
    console.log(`Deletando livro com ID: ${id}`);

    const resultado = await this.repository.delete(id);

    return resultado.affected ? resultado.affected > 0 : false;
  }
}