import { PartialType } from '@nestjs/mapped-types';
import { CreateGuardiasLocalizadaDto } from './create-guardias-localizada.dto';

export class UpdateGuardiasLocalizadaDto extends PartialType(CreateGuardiasLocalizadaDto) {}
