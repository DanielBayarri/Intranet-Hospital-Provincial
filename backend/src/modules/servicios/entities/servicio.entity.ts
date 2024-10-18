import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Grupo } from "src/modules/grupos/entities/grupo.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";

@Entity({ name: "servicios" })
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Grupo, grupo => grupo.servicios)
  grupo: Grupo;

  @ManyToMany(() => Usuario, usuario => usuario.servicios)
  @JoinTable({ name: "usuarios_servicios" })
  usuarios: Usuario[];
}
