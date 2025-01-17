import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Usuario } from "../usuarios/entities/usuario.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role, Usuario])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
