import { ServicioInterface } from './servicio.interface';
import { TipoInterface } from './tipo.interface';

export interface GrupoInterface {
  id: number;
  nombre: string;
  servicios: ServicioInterface[];
  tipos: TipoInterface[];
}

export interface GrupoListInterface {
  id: number;
  nombre: string;
}

export interface CreateGrupoInterface {
  nombre: string;
  serviciosIds?: number[];
}
