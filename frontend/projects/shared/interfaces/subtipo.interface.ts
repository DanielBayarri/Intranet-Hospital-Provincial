import { TipoInterface } from './tipo.interface';

export interface SubtipoInterface {
  id: number;
  nombre: string;
  tipo: TipoInterface;
}

export interface CreateSubtipoInterface {
  nombre: string;
  tipoId: number;
}
