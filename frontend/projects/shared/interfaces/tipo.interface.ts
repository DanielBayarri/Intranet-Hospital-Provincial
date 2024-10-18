import { GrupoInterface } from './grupo.interface';
import { SubtipoInterface } from './subtipo.interface';

export interface TipoInterface {
  id: number;
  nombre: string;
  grupo: GrupoInterface;
  subtipos: SubtipoInterface[];
}

export interface CreateTipoInterface {
  nombre: string;
  grupoId: number;
}
