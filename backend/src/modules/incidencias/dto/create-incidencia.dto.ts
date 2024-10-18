import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from "class-validator";

export class CreateIncidenciaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;

  @IsNumber()
  @IsNotEmpty()
  tipoId: number;

  @IsNumber()
  @IsOptional()
  subtipoId: number;

  @IsNumber()
  @IsNotEmpty()
  turnoId: number;
}
