// Livro.ts - Entity TypeORM (vira tabela no banco)

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Editora } from './editora';

// @Entity() = "Esta classe vira uma tabela no banco"
@Entity('livros')
export class Livro {
  // ID único, gerado automaticamente
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Coluna de texto, obrigatória
  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  autor: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  isbn: string;

  @Column({ type: 'int', nullable: false })
  anoPublicacao: number;

  // Relacionamento: muitos livros para uma editora
  @ManyToOne(() => Editora, (editora) => editora.livros, { eager: true })
  @JoinColumn({ name: 'editoraId' })
  editora: Editora;

  // ID da editora (chave estrangeira)
  @Column({ type: 'uuid', nullable: false })
  editoraId: string;

}