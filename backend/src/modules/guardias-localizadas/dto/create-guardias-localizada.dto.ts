import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGuardiasLocalizadaDto {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsNumber()
  @IsNotEmpty()
  usuarioId: number;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;
}
