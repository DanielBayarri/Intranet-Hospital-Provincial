import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Servicio } from "src/modules/servicios/entities/servicio.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { Tipo } from "src/modules/tipos/entities/tipo.entity";

@Entity({ name: "grupos" })
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Servicio, servicio => servicio.grupo)
  servicios: Servicio[];

  @OneToMany(() => Usuario, usuario => usuario.grupo)
  usuarios: Usuario[];

  @OneToMany(() => Tipo, tipo => tipo.grupo)
  tipos: Tipo[];
}
