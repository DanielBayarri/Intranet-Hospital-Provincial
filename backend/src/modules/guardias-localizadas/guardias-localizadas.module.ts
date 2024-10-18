import { Module } from "@nestjs/common";
import { GuardiasLocalizadasService } from "./guardias-localizadas.service";
import { GuardiasLocalizadasController } from "./guardias-localizadas.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GuardiasLocalizada } from "./entities/guardias-localizada.entity";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([GuardiasLocalizada, Usuario, Grupo])],

  controllers: [GuardiasLocalizadasController],
  providers: [GuardiasLocalizadasService],
})
export class GuardiasLocalizadasModule {}
