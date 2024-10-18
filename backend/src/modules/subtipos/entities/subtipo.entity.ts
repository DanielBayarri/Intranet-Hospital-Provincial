import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tipo } from "src/modules/tipos/entities/tipo.entity";

@Entity({ name: "subtipos" })
export class Subtipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Tipo, tipo => tipo.subtipos)
  tipo: Tipo;
}