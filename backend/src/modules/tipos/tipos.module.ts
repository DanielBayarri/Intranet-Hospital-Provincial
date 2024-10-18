import { Module } from "@nestjs/common";
import { TiposService } from "./tipos.service";
import { TiposController } from "./tipos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tipo } from "./entities/tipo.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Tipo, Grupo])],
  controllers: [TiposController],
  providers: [TiposService],
})
export class TiposModule {}
