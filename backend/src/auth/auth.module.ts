import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { configLdap } from "src/config/ldap.config";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: configLdap.JWT_SEED,
      signOptions: { expiresIn: configLdap.JWT_EXPIRATION_TIME },
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],

  exports: [AuthService],
})
export class AuthModule {}
