import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { configLdap } from "src/config/ldap.config";
import * as ldap from "ldapjs";
import { Repository } from "typeorm";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "./interfaces/jwt-payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async validateUserOnLdap(username: string, password: string): Promise<any> {
    const client = ldap.createClient({
      url: `ldap://172.17.35.101`,
    });

    let dni = username;
    const usuario = await this.usuarioRepository.findOne({ where: { dni }, relations: ["grupo", "servicios", "incidencias"] });

    if (!usuario) {
      throw new HttpException(`El DNI ${dni} no está registrado en la aplicación`, HttpStatus.NOT_FOUND);
    }
    if (usuario.bloqueado) {
      throw new HttpException("El usuario esta bloqueado.", HttpStatus.UNAUTHORIZED);
    }
    return new Promise((resolve, reject) => {
      client.on("error", (err: any) => {
        reject(new Error("LDAP error de conexión"));
      });

      const userDN = `${username}@${configLdap.LDAP_DOMAIN}`;

      client.bind(userDN, password, async (err: any) => {
        if (err) {
          console.error("Error en el proceso de bind con el LDAP", {
            error: err.message,
            userDN, // Loguear el DN que se está usando
            username,
          });
          client.destroy();
          reject(new HttpException("Error en las credenciales LDAP: Usuario o contraseña incorrecto", HttpStatus.FORBIDDEN));
        } else {
          try {
            // const ldapUserData = await this.fetchLdapUserAttributes(client, username);
            client.unbind();
            let res = { usuario, /* ldapUserData,*/ token: this.getJWT({ dni: usuario.dni }) };
            resolve(res);
          } catch (searchError) {
            client.destroy();
            reject(searchError);
          }
        }
      });
    });
  }

  getJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
