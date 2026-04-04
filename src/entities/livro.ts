// Livro.ts - Entity TypeORM (vira tabela no banco)

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Editora } from './editora';

@Entity('livros')
export class Livro {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  autor: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  isbn: string;

  @Column({ type: 'int', nullable: false })
  anoPublicacao: number;

  @ManyToOne(() => Editora, (editora) => editora.livros, { eager: true })
  @JoinColumn({ name: 'editoraId' })
  editora: Editora;

  @Column({ type: 'uuid', nullable: false })
  editoraId: string;

}