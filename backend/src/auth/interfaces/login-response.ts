import { Usuario } from "src/modules/usuarios/entities/usuario.entity";

export interface LoginResponse {
  user: Usuario;
  token: string;
}
