import { UsuarioInterface } from '../usuario.interface'

export interface authResponseInterface {
  user: UsuarioInterface
  token: string
}
