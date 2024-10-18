import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGuardiasLocalizadaDto } from "./dto/create-guardias-localizada.dto";
import { UpdateGuardiasLocalizadaDto } from "./dto/update-guardias-localizada.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GuardiasLocalizada } from "./entities/guardias-localizada.entity";
import { Repository } from "typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { Grupo } from "../grupos/entities/grupo.entity";

@Injectable()
export class GuardiasLocalizadasService {
  constructor(
    @InjectRepository(GuardiasLocalizada)
    private guardiaRepository: Repository<GuardiasLocalizada>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
  ) {}

  async create(createGuardiasLocalizadaDto: CreateGuardiasLocalizadaDto) {
    const { usuarioId, grupoId, ...guardia } = createGuardiasLocalizadaDto;

    const usuario = await this.usuarioRepository.findOne({ where: { id: usuarioId } });

    const grupo = await this.grupoRepository.findOne({ where: { id: grupoId } });
    if (!usuario) {
      throw new NotFoundException("Usuario no encontrado");
    }

    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }

    const newGuardia = {
      ...guardia,
      usuario,
      grupo,
    };
    this.guardiaRepository.create(newGuardia);
    return this.guardiaRepository.save(newGuardia);
  }

  findAll() {
    return this.guardiaRepository.find({
      relations: ["usuario", "grupo"],
    });
  }

  async findOne(id: number) {
    const guardia = await this.guardiaRepository.findOne({
      where: { id },
      relations: ["usuario", "grupo"],
    });

    if (!guardia) {
      throw new NotFoundException(`Guardia localizada con ID ${id} no encontrada`);
    }

    return guardia;
  }

  async update(id: number, updateGuardiasLocalizadaDto: UpdateGuardiasLocalizadaDto) {
    const guardia = await this.guardiaRepository.preload({ id: id, ...updateGuardiasLocalizadaDto });

    if (!guardia) {
      throw new NotFoundException(`Guardia localizada con ID ${id} no encontrada`);
    }

    const usuario = await this.usuarioRepository.findOne({ where: { id: updateGuardiasLocalizadaDto.usuarioId } });

    if (!usuario) throw new NotFoundException("Usuario no encontrado");

    guardia.usuario = usuario;

    const grupo = await this.grupoRepository.findOne({ where: { id: updateGuardiasLocalizadaDto.grupoId } });
    if (!grupo) throw new NotFoundException("Grupo no encontrado");
    guardia.grupo = grupo;

    return this.guardiaRepository.save(guardia);
  }

  async remove(id: number) {
    const guardia = await this.findOne(id);
    return this.guardiaRepository.remove(guardia);
  }
}
