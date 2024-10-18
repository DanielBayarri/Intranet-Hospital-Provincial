import { Module } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { UsuariosController } from "./usuarios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Grupo } from "../grupos/entities/grupo.entity";
import { Servicio } from "../servicios/entities/servicio.entity";
import { Role } from "../roles/entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Grupo, Servicio, Role])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
