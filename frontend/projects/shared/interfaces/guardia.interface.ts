import { GrupoInterface } from './grupo.interface';
import { UsuarioInterface } from './usuario.interface';

export interface GuardiaLocalizadaInterface {
  id: number;
  comentario: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  usuario: UsuarioInterface;
  grupo: GrupoInterface;
}

export interface CrearGuardiaLocalizadaInterface {
  id?: number;
  comentario: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  usuarioId: number;
  grupoId: number;
}
