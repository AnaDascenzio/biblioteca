import { Editora } from "../entities/editora";
import { EditoraRepository } from "../repositories/editoraRepository";
import { EditoraValidator } from "./validator/editoraValidator";

export class EditoraService {
  private editoraRepository: EditoraRepository;
  private editoraValidator: EditoraValidator;

  constructor() {
    this.editoraRepository = new EditoraRepository();
    this.editoraValidator = new EditoraValidator();
  }

  public async criar(dados: Partial<Editora>): Promise<Editora> {
    console.log('Service: Criando editora com validações');
    this.editoraValidator.validarEditora(dados as Editora);
    
    return await this.editoraRepository.criar(dados);
  }

  public async buscarTodas(): Promise<Editora[]> {
    console.log('Service: Buscando todas as editoras');
    return await this.editoraRepository.buscarTodas();
  }

  public async buscarPorId(id: string): Promise<Editora> {
    console.log(`Service: Buscando editora ${id}`);

    const editora = await this.editoraRepository.buscarPorId(id);

    if (!editora) {
      throw new Error(`Editora com ID ${id} não encontrada`);
    }

    return editora;
  }

  public async buscarPorNome(nome: string): Promise<Editora[]> {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da editora é obrigatório');
    }

    return await this.editoraRepository.buscarPorNome(nome);
  }

  public async atualizar(
    id: string,
    dados: Pick<Editora, 'nome' | 'endereco'> // Só permite atualizar nome e endereço, com o partial permitia atualizar o ID
  ): Promise<Editora | null> {
    console.log(`Service: Atualizando editora ${id}`);

    // Verifica se editora existe
    await this.buscarPorId(id);

    this.editoraValidator.validarEditora({ ...dados } as Editora);

    return await this.editoraRepository.atualizar(id, dados);
  }

  public async deletar(id: string): Promise<void> {
    console.log(`🗑️ Service: Deletando editora ${id}`);

    const editora = await this.buscarPorId(id);

    if (editora.livros && editora.livros.length > 0) {
      throw new Error(
        `Não é possível deletar editora com ${editora.livros.length} livro(s). ` +
        `Delete os livros primeiro!`
      );
    }

    const deletado = await this.editoraRepository.deletar(id);

    if (!deletado) {
      throw new Error('Erro ao deletar editora');
    }

    console.log(`Editora ${editora.nome} deletada com sucesso`);
  }

  public async contarLivros(id: string): Promise<number> {
    const editora = await this.buscarPorId(id);
    return editora.livros?.length || 0;
  }
}