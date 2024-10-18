import { GrupoInterface } from './grupo.interface';
import { TipoInterface } from './tipo.interface';

export interface ServicioInterface {
  id: number;
  nombre: string;
  tipos: TipoInterface[];
  grupo: GrupoInterface;
}

export interface ServicioListInterface {
  id: number;
  nombre: string;
}

export interface CreateServicioInterface {
  nombre: string;
  grupoId: number;
}
