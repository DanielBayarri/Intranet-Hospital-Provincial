import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from "src/modules/usuarios/usuarios.service";
import { JwtPayload } from "../interfaces/jwt-payload";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { configLdap } from "src/config/ldap.config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); //Datos sobre la peticion(desdedonde, header, etc. )
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("No hay token de autenticacion");
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: configLdap.JWT_SEED,
      });
      let dni = payload.dni;
      const user = await this.usuarioRepository.findOne({ where: { dni }, relations: ["grupo", "role", "servicios", "incidencias"] });
      if (!user) throw new UnauthorizedException("El usuario no existe");

      request["user"] = user;
    } catch {
      throw new UnauthorizedException("gasgg");
    }

    return Promise.resolve(true);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
