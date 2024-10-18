import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateIncidenciaDto } from "./dto/create-incidencia.dto";
import { UpdateIncidenciaDto } from "./dto/update-incidencia.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Incidencia } from "./entities/incidencia.entity";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { Tipo } from "../tipos/entities/tipo.entity";
import { Subtipo } from "../subtipos/entities/subtipo.entity";
import { Turno } from "../turnos/entities/turno.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
    @InjectRepository(Subtipo)
    private subtipoRepository: Repository<Subtipo>,
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
  ) {}

  async create(createIncidenciaDto: CreateIncidenciaDto) {
    const { usuarioId, grupoId, tipoId, subtipoId, turnoId, ...incidencia } = createIncidenciaDto;

    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
    const grupo = await this.grupoRepository.findOne({ where: { id: grupoId } });
    const tipo = await this.tipoRepository.findOne({ where: { id: tipoId } });
    const subtipo = await this.subtipoRepository.findOne({ where: { id: subtipoId } });
    const turno = await this.turnoRepository.findOne({ where: { id: turnoId } });

    if (!usuario) {
      throw new NotFoundException("Usuario no encontrado");
    }
    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }
    if (!tipo) {
      throw new NotFoundException("Tipo de Incidencia no encontrado");
    }
    if (!subtipo) {
      throw new NotFoundException("Subtipo de Incidencia no encontrado");
    }
    if (!turno) {
      throw new NotFoundException("Turno no encontrado");
    }

    const newIncidencia = {
      ...incidencia,
      usuario,
      grupo,
      tipo,
      subtipo,
      turno,
    };
    this.incidenciaRepository.create(newIncidencia);

    return this.incidenciaRepository.save(newIncidencia);
  }

  findAll() {
    return this.incidenciaRepository.find({
      relations: ["usuario", "grupo", "tipo", "subtipo", "turno"],
    });
  }

  async findOne(id: number) {
    const incidencia = await this.incidenciaRepository.findOne({
      where: { id },
      relations: ["usuario", "grupo", "tipo", "subtipo", "turno"],
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con ID ${id} no encontrada`);
    }

    return incidencia;
  }

  async update(id: number, updateIncidenciaDto: UpdateIncidenciaDto) {
    const incidencia = await this.incidenciaRepository.preload({
      id: id,
      ...updateIncidenciaDto,
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con ID ${id} no encontrada`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: updateIncidenciaDto.usuarioId } });
    if (!usuario) throw new NotFoundException("Usuario no encontrado");
    incidencia.usuario = usuario;

    const grupo = await this.grupoRepository.findOne({ where: { id: updateIncidenciaDto.grupoId } });
    if (!grupo) throw new NotFoundException("Grupo no encontrado");
    incidencia.grupo = grupo;

    const tipo = await this.tipoRepository.findOne({ where: { id: updateIncidenciaDto.tipoId } });
    if (!tipo) throw new NotFoundException("Tipo de Incidencia no encontrado");
    incidencia.tipo = tipo;

    const subtipo = await this.subtipoRepository.findOne({ where: { id: updateIncidenciaDto.subtipoId } });
    if (!subtipo) throw new NotFoundException("Subtipo de Incidencia no encontrado");
    incidencia.subtipo = subtipo;

    const turno = await this.turnoRepository.findOne({ where: { id: updateIncidenciaDto.turnoId } });
    if (!turno) throw new NotFoundException("Turno no encontrado");
    incidencia.turno = turno;

    return this.incidenciaRepository.save(incidencia);
  }

  async remove(id: number) {
    const incidencia = await this.findOne(id);
    return this.incidenciaRepository.remove(incidencia);
  }

  // Filtrado
  async findByUsuario(usuarioId: number) {
    return this.incidenciaRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ["usuario", "grupo", "tipo", "subtipo", "turno"],
    });
  }

  async findByTurno(turnoId: number) {
    return this.incidenciaRepository.find({
      where: { turno: { id: turnoId } },
      relations: ["usuario", "grupo", "tipo", "subtipo", "turno"],
    });
  }
}
