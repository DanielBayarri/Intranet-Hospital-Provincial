import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Subtipo } from "src/modules/subtipos/entities/subtipo.entity";
import { Grupo } from "src/modules/grupos/entities/grupo.entity";

@Entity({ name: "tipos" })
export class Tipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Grupo, grupo => grupo.tipos)
  grupo: Grupo;

  @OneToMany(() => Subtipo, subtipo => subtipo.tipo)
  subtipos: Subtipo[];
}
