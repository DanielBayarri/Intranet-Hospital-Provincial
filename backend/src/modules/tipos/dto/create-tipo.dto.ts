import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;
}
