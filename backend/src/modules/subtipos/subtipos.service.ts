import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateSubtipoDto } from "./dto/create-subtipo.dto";
import { UpdateSubtipoDto } from "./dto/update-subtipo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subtipo } from "./entities/subtipo.entity";
import { Tipo } from "../tipos/entities/tipo.entity";
import { Incidencia } from "../incidencias/entities/incidencia.entity";

@Injectable()
export class SubtiposService {
  constructor(
    @InjectRepository(Subtipo)
    private subtipoRepository: Repository<Subtipo>,
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(createSubtipoDto: CreateSubtipoDto) {
    const { tipoId, ...subtipo } = createSubtipoDto;

    const tipo = await this.tipoRepository.findOne({
      where: { id: tipoId },
    });
    if (!tipo) {
      throw new NotFoundException("Tipo de Incidencia no encontrado");
    }

    const newSubtipo = { ...subtipo, tipo };

    this.subtipoRepository.create(newSubtipo);
    return this.subtipoRepository.save(newSubtipo);
  }

  findAll() {
    return this.subtipoRepository.find({
      relations: ["tipo"],
    });
  }

  async findOne(id: number) {
    const subtipo = await this.subtipoRepository.findOne({
      where: { id },
      relations: ["tipo"],
    });

    if (!subtipo) {
      throw new NotFoundException(`Subtipo con ID ${id} no encontrado`);
    }
    return subtipo;
  }

  async update(id: number, updateSubtipoDto: UpdateSubtipoDto) {
    const subtipo = await this.subtipoRepository.preload({
      id: id,
      ...updateSubtipoDto,
    });

    if (!subtipo) {
      throw new NotFoundException(`Subtipo con ID ${id} no encontrado`);
    }

    const tipo = await this.tipoRepository.findOne({
      where: { id: updateSubtipoDto.tipoId },
    });
    if (!tipo) {
      throw new NotFoundException("Tipo de Incidencia no encontrado");
    }
    subtipo.tipo = tipo;
    return this.subtipoRepository.save(subtipo);
  }
  async remove(id: number) {
    const subtipo = await this.findOne(id);

    const incidenciasRelacionadas = await this.incidenciaRepository.find({
      where: { subtipo: subtipo },
    });

    if (incidenciasRelacionadas.length > 0) {
      throw new BadRequestException(`No se puede eliminar el subtipo con ID ${id} porque hay incidencias relacionadas.`);
    }

    // Si no hay incidencias, proceder con la eliminación
    try {
      return await this.subtipoRepository.remove(subtipo);
    } catch (error) {
      throw new InternalServerErrorException(`Error al eliminar el subtipo con ID ${id}: ${error.message}`);
    }
  }
}
