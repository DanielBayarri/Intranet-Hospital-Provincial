import { Incidencia } from "src/modules/incidencias/entities/incidencia.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "turnos" })
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;

  @OneToMany(() => Incidencia, incidencia => incidencia.turno)
  incidencias: Incidencia[];
}