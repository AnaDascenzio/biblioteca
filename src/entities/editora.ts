// Editora.ts - Entity TypeORM

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from './livro';

@Entity('editoras')
export class Editora {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  endereco?: string;

  @OneToMany(() => Livro, (livro) => livro.editora)
  livros: Livro[];

}