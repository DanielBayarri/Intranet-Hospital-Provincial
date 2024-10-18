import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./interfaces/login-response";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post("/login")
  async login (@Body() loginDto: LoginDto) {
    return await this.authService.validateUserOnLdap(loginDto.dni, loginDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("check-token")
  checkToken (@Request() req: Request): LoginResponse {
    const usuario = req["user"] as Usuario;
    return {
      user: usuario,
      token: this.authService.getJWT({ dni: usuario.dni }),
    };
  }
}
