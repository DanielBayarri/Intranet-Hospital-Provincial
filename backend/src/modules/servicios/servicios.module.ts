import { Module } from "@nestjs/common";
import { ServiciosService } from "./servicios.service";
import { ServiciosController } from "./servicios.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Servicio } from "./entities/servicio.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Grupo])],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}
