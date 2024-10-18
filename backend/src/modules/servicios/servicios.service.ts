import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { UpdateServicioDto } from "./dto/update-servicio.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Servicio } from "./entities/servicio.entity";
import { In, Repository } from "typeorm";
import { Grupo } from "../grupos/entities/grupo.entity";

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
  ) {}

  async create(CreateServicioDto: CreateServicioDto) {
    const { grupoId, ...servicioData } = CreateServicioDto;

    const grupo = await this.grupoRepository.findOne({
      where: { id: grupoId },
    });

    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }

    const newServicio = this.servicioRepository.create({
      ...servicioData,
      grupo,
    });

    return this.servicioRepository.save(newServicio);
  }

  findAll() {
    return this.servicioRepository.find({
      relations: ["grupo"],
    });
  }

  async findOne(id: number) {
    const servicio = await this.servicioRepository.findOne({
      where: { id },
      relations: ["usuarios", "grupo"],
    });
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    return servicio;
  }

  async update(id: number, updateServicioDto: UpdateServicioDto) {
    const { grupoId, ...servicioData } = updateServicioDto;

    const servicio = await this.servicioRepository.preload({
      id: id,
      ...servicioData,
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    const grupo = await this.grupoRepository.findOne({
      where: { id: grupoId },
    });

    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }

    servicio.grupo = grupo;

    return this.servicioRepository.save(servicio);
  }

  async remove(id: number) {
    const servicio = await this.findOne(id);
    return this.servicioRepository.remove(servicio);
  }
}
