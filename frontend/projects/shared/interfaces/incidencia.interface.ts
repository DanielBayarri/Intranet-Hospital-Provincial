import { GrupoInterface } from './grupo.interface';
import { ServicioInterface } from './servicio.interface';
import { SubtipoInterface } from './subtipo.interface';
import { TipoInterface } from './tipo.interface';
import { TurnoInterface } from './turno.interface';
import { UsuarioInterface } from './usuario.interface';

export interface IncidenciaInterface {
  id: number;
  titulo: string;
  fecha: Date;
  horaInicio: string;
  comentario: string;
  usuario: UsuarioInterface;
  grupo: GrupoInterface;
  tipo: TipoInterface;
  subtipo: SubtipoInterface;
  turno: TurnoInterface;
}

export interface CrearIncidenciaInterface {
  id?: number;
  titulo: string;
  fecha: Date;
  horaInicio: string;
  comentario: string;
  usuarioId: number;
  grupoId: number;
  tipoId: number;
  subtipoId: number;
  turnoId: number;
}
