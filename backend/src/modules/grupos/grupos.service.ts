import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGrupoDto } from "./dto/create-grupo.dto";
import { UpdateGrupoDto } from "./dto/update-grupo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Grupo } from "./entities/grupo.entity";
import { In, Repository } from "typeorm";
import { Servicio } from "../servicios/entities/servicio.entity";

@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  async create(createGrupoDto: CreateGrupoDto) {
    const grupo = createGrupoDto;

    const newGrupo = this.grupoRepository.create({
      ...grupo,
    });

    return this.grupoRepository.save(newGrupo);
  }

  findAll() {
    return this.grupoRepository.find();
  }

  async findOne(id: number) {
    const grupo = await this.grupoRepository.findOne({
      where: { id },
      relations: ["servicios", "tipos"],
    });
    if (!grupo) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }

    return grupo;
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto) {
    const { serviciosIds, ...grupoData } = updateGrupoDto;

    const grupo = await this.grupoRepository.preload({
      id: id,
      ...grupoData,
    });

    if (!grupo) {
      throw new NotFoundException(`Grupo con ID ${id} no encontrado`);
    }

    if (serviciosIds && serviciosIds.length > 0) {
      const servicios = await this.servicioRepository.findBy({
        id: In(serviciosIds),
      });

      if (servicios.length !== serviciosIds.length) {
        throw new NotFoundException("Uno o más servicios no encontrados");
      }

      grupo.servicios = servicios;
    }

    return this.grupoRepository.save(grupo);
  }

  async remove(id: number) {
    const grupo = await this.findOne(id);
    return this.grupoRepository.remove(grupo);
  }
}
