import { Editora } from "../../entities/editora";

export class EditoraValidator {
    public validarEditora(editora: Editora): void {
        console.log('Validando dados da editora...')
        if (!editora.nome || editora.nome.trim().length === 0) {
            throw new Error('Nome da editora é obrigatório');
        }
        if (editora.nome.length < 3) {
            throw new Error('Nome da editora deve ter no mínimo 3 caracteres');
        }
        console.log('Dados da editora validados com sucesso');
    }
}