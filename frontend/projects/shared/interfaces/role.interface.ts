import { UsuarioInterface } from './usuario.interface';

export interface RoleInterface {
  id: number;
  nombre: string;
  usuarios: UsuarioInterface[];
}
