import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Grupo } from "src/modules/grupos/entities/grupo.entity";
import { Incidencia } from "src/modules/incidencias/entities/incidencia.entity";
import { Servicio } from "src/modules/servicios/entities/servicio.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { GuardiasLocalizada } from "src/modules/guardias-localizadas/entities/guardias-localizada.entity";

@Entity({ name: "usuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  dni: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  bloqueado: boolean;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role;

  @ManyToMany(() => Servicio, servicio => servicio.usuarios)
  @JoinTable({ name: "usuarios_servicios" })
  servicios: Servicio[];

  @ManyToOne(() => Grupo, grupo => grupo.usuarios)
  grupo: Grupo;

  @OneToMany(() => Incidencia, incidencia => incidencia.usuario)
  incidencias: Incidencia[];

  @OneToMany(() => GuardiasLocalizada, guardia => guardia.usuario)
  guardias: GuardiasLocalizada[];
}
