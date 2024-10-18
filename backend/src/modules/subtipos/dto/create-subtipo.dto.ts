import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateSubtipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  tipoId: number;
}
