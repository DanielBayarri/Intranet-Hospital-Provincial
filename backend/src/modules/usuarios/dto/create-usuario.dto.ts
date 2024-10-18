import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber, IsEmail, IsInt, IsBoolean } from "class-validator";

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  bloqueado?: boolean;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;

  @IsArray()
  @IsInt({ each: true })
  serviciosIds: number[];
}
