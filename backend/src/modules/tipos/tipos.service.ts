import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTipoDto } from "./dto/create-tipo.dto";
import { UpdateTipoDto } from "./dto/update-tipo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tipo } from "./entities/tipo.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
  ) {}

  async create(createTipoDto: CreateTipoDto) {
    const { grupoId, ...tipo } = createTipoDto;

    const grupo = await this.grupoRepository.findOne({
      where: { id: grupoId },
    });
    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }

    const newTipo = { ...tipo, grupo };

    this.tipoRepository.create(newTipo);
    return this.tipoRepository.save(newTipo);
  }

  findAll() {
    return this.tipoRepository.find({
      relations: ["grupo", "subtipos"],
    });
  }

  async findOne(id: number) {
    const tipo = await this.tipoRepository.findOne({
      where: { id },
      relations: ["grupo", "subtipos"],
    });

    if (!tipo) {
      throw new NotFoundException(`Tipo con ID ${id} no encontrado`);
    }
    return tipo;
  }

  async update(id: number, updateTipoDto: UpdateTipoDto) {
    const tipo = await this.tipoRepository.preload({
      id: id,
      ...updateTipoDto,
    });

    if (!tipo) {
      throw new NotFoundException(`Tipo con ID ${id} no encontrado`);
    }

    const grupo = await this.grupoRepository.findOne({
      where: { id: updateTipoDto.grupoId },
    });
    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }
    tipo.grupo = grupo;
    return this.tipoRepository.save(tipo);
  }

  async remove(id: number) {
    const tipo = await this.findOne(id);
    return this.tipoRepository.remove(tipo);
  }
}
