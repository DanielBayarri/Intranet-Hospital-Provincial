import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubtiposService } from './subtipos.service';
import { CreateSubtipoDto } from './dto/create-subtipo.dto';
import { UpdateSubtipoDto } from './dto/update-subtipo.dto';

@Controller('subtipos')
export class SubtiposController {
  constructor(private readonly subtiposService: SubtiposService) {}

  @Post()
  create(@Body() createSubtipoDto: CreateSubtipoDto) {
    return this.subtiposService.create(createSubtipoDto);
  }

  @Get()
  findAll() {
    return this.subtiposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubtipoDto: UpdateSubtipoDto) {
    return this.subtiposService.update(+id, updateSubtipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtiposService.remove(+id);
  }
}
