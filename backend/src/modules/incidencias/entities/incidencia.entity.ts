import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Turno } from "src/modules/turnos/entities/turno.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { Tipo } from "src/modules/tipos/entities/tipo.entity";
import { Subtipo } from "src/modules/subtipos/entities/subtipo.entity";
import { Grupo } from "src/modules/grupos/entities/grupo.entity";

@Entity({ name: "incidencias" })
export class Incidencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: "date" })
  fecha: Date;

  @Column({ type: "time" })
  horaInicio: string;

  @Column("text")
  comentario: string;

  @ManyToOne(() => Usuario, usuario => usuario.incidencias)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Grupo)
  @JoinColumn()
  grupo: Grupo;

  @ManyToOne(() => Tipo)
  @JoinColumn()
  tipo: Tipo;

  @ManyToOne(() => Subtipo)
  @JoinColumn()
  subtipo: Subtipo;

  @ManyToOne(() => Turno)
  @JoinColumn()
  turno: Turno;
}
