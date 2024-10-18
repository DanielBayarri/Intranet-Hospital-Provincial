import { IsString, IsNotEmpty, IsArray, IsOptional, IsInt, IsNumber } from "class-validator";

export class CreateGrupoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  usuariosIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  serviciosIds: number[];
}
