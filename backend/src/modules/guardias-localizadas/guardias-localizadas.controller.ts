import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuardiasLocalizadasService } from './guardias-localizadas.service';
import { CreateGuardiasLocalizadaDto } from './dto/create-guardias-localizada.dto';
import { UpdateGuardiasLocalizadaDto } from './dto/update-guardias-localizada.dto';

@Controller('guardias-localizadas')
export class GuardiasLocalizadasController {
  constructor(private readonly guardiasLocalizadasService: GuardiasLocalizadasService) {}

  @Post()
  create(@Body() createGuardiasLocalizadaDto: CreateGuardiasLocalizadaDto) {
    return this.guardiasLocalizadasService.create(createGuardiasLocalizadaDto);
  }

  @Get()
  findAll() {
    return this.guardiasLocalizadasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardiasLocalizadasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardiasLocalizadaDto: UpdateGuardiasLocalizadaDto) {
    return this.guardiasLocalizadasService.update(+id, updateGuardiasLocalizadaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardiasLocalizadasService.remove(+id);
  }
}
