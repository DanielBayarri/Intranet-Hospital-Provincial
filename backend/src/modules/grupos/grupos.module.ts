import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GruposService } from "./grupos.service";
import { GruposController } from "./grupos.controller";
import { Grupo } from "./entities/grupo.entity";
import { Servicio } from "../servicios/entities/servicio.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Grupo, Servicio])],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
