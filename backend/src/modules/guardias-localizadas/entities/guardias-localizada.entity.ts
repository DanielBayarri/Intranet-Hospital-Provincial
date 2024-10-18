import { Grupo } from "src/modules/grupos/entities/grupo.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "guardias-localizadas" })
export class GuardiasLocalizada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @Column({ type: "date" })
  fecha: Date;

  @Column({ type: "time" })
  horaInicio: string;

  @Column({ type: "time" })
  horaFin: string;

  @ManyToOne(() => Usuario, usuario => usuario.guardias)
  @JoinColumn()
  usuario: Usuario;

  @ManyToOne(() => Grupo)
  @JoinColumn()
  grupo: Grupo;
}
