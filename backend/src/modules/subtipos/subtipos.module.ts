import { Module } from "@nestjs/common";
import { SubtiposService } from "./subtipos.service";
import { SubtiposController } from "./subtipos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subtipo } from "./entities/subtipo.entity";
import { Tipo } from "../tipos/entities/tipo.entity";
import { Incidencia } from "../incidencias/entities/incidencia.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subtipo, Tipo, Incidencia])],
  controllers: [SubtiposController],
  providers: [SubtiposService],
})
export class SubtiposModule {}
