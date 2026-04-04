import { Livro } from "../../entities/livro";

export class LivroValidator {

    public validarDadosLivro(livro: Livro): void {
        console.log('📝 Validando dados do livro...')

        // Validação 1: Título obrigatório
        // Validação 2: Título mínimo 3 caracteres
        this.validarTitulo(livro.titulo);

        // Validação 3: Autor obrigatório
        this.validarAutor(livro.autor);

        // Validação 4: ISBN obrigatório
        // Validação 5: ISBN deve ter no mínimo 10 dígitos
        this.validarIsbn(livro.isbn);

        // Validação 9: Editora deve existir
        this.validarEditoraId(livro.editoraId);
        console.log('Dados do livro validados com sucesso');
    }

    private validarTitulo(titulo: string): void {
        if (!titulo || titulo.trim().length === 0) {
            throw new Error('Título é obrigatório');
        }
        if (titulo.length < 3) {
            throw new Error('Título deve ter no mínimo 3 caracteres');
        }
    }

    private validarAutor(autor: string): void {
        if (!autor || autor.trim().length === 0) {
            throw new Error('Autor é obrigatório');
        }
    }

    private validarIsbn(isbn: string): void {
        if (!isbn || isbn.trim().length === 0) {
            throw new Error('ISBN é obrigatório');
        }
        if (isbn.replace(/\D/g, '').length < 10) {
            throw new Error('ISBN deve ter no mínimo 10 dígitos');
        }
    }

    private validarEditoraId(editoraId: string): void {
        if (!editoraId || editoraId.trim().length === 0) {
            throw new Error('ID da editora é obrigatório');
        }
    }
}