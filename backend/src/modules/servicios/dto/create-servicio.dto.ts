import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;
}
