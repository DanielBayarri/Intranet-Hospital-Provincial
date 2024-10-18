import { Module } from "@nestjs/common";
import { IncidenciasService } from "./incidencias.service";
import { IncidenciasController } from "./incidencias.controller";
import { Incidencia } from "./entities/incidencia.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { Subtipo } from "../subtipos/entities/subtipo.entity";
import { Tipo } from "../tipos/entities/tipo.entity";
import { Turno } from "../turnos/entities/turno.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia, Usuario, Grupo, Tipo, Subtipo, Turno])],
  controllers: [IncidenciasController],
  providers: [IncidenciasService],
})
export class IncidenciasModule {}
