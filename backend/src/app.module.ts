import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsuariosModule } from "./modules/usuarios/usuarios.module";
import { ServiciosModule } from "./modules/servicios/servicios.module";
import { TurnosModule } from "./modules/turnos/turnos.module";
import { IncidenciasModule } from "./modules/incidencias/incidencias.module";
import { GuardiasLocalizadasModule } from "./modules/guardias-localizadas/guardias-localizadas.module";
import { TiposModule } from "./modules/tipos/tipos.module";
import { SubtiposModule } from "./modules/subtipos/subtipos.module";
import { GruposModule } from "./modules/grupos/grupos.module";
import { RolesModule } from "./modules/roles/roles.module";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from "./config/config";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    UsuariosModule,
    GruposModule,
    ServiciosModule,
    TurnosModule,
    IncidenciasModule,
    GuardiasLocalizadasModule,
    TiposModule,
    SubtiposModule,
    AuthModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
