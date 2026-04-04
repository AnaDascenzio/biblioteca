import { AppDataSource } from '../database/dataSource';
import { Editora } from '../entities/editora';

export class EditoraRepository {
  private repository = AppDataSource.getRepository(Editora);

  public async criar(dados: Partial<Editora>): Promise<Editora> {
    console.log('Criando editora:', dados.nome);

    const editora = this.repository.create(dados);
    return await this.repository.save(editora);
  }

  public async buscarTodas(): Promise<Editora[]> {
    console.log('Buscando todas as editoras...');

    return await this.repository.find({
      relations: ['livros'],
      order: { nome: 'ASC' }
    });
  }

  public async buscarPorId(id: string): Promise<Editora | null> {
    console.log(`Buscando editora com ID: ${id}`);

    return await this.repository.findOne({
      where: { id },
      relations: ['livros']
    });
  }

  public async buscarPorNome(nome: string): Promise<Editora[]> {
    console.log(`Buscando editora com nome: ${nome}`);

    return await this.repository
      .createQueryBuilder('editora')
      .where('editora.nome ILIKE :nome', { nome: `%${nome}%` })
      .leftJoinAndSelect('editora.livros', 'livros')
      .getMany();
  }

  public async atualizar(
    id: string,
    dados: Partial<Editora>
  ): Promise<Editora | null> {
    console.log(`Atualizando editora com ID: ${id}`);

    await this.repository.update(id, dados);
    return await this.buscarPorId(id);
  }

  public async deletar(id: string): Promise<boolean> {
    console.log(`Deletando editora com ID: ${id}`);

    const resultado = await this.repository.delete(id);
    return resultado.affected ? resultado.affected > 0 : false;
  }
}