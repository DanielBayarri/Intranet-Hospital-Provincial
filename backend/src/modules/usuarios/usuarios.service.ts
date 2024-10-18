import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { In, Repository } from "typeorm";
import { Grupo } from "../grupos/entities/grupo.entity";
import { Servicio } from "../servicios/entities/servicio.entity";
import { Role } from "../roles/entities/role.entity";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Grupo)
    private grupoRepository: Repository<Grupo>,
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { grupoId, roleId, dni, serviciosIds, ...usuarioData } = createUsuarioDto;

    const dniExist = await this.usuarioRepository.findOne({ where: { dni } });
    if (dniExist) {
      throw new HttpException(`El DNI ${dni} ya está registrado en otro usuario`, HttpStatus.CONFLICT);
    }

    const grupo = await this.grupoRepository.findOne({
      where: { id: grupoId },
      relations: ["servicios"],
    });
    if (!grupo) {
      throw new NotFoundException("Grupo no encontrado");
    }

    const role = await this.roleRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException("Role no encontrado");
    }

    const servicios = await this.servicioRepository.findBy({
      id: In(serviciosIds),
    });
    if (servicios.length !== serviciosIds.length) {
      throw new NotFoundException("Uno o más servicios no encontrados");
    }

    //
    const gruposServiciosIds = grupo.servicios.map(servicio => servicio.id);

    const serviciosInvalidos = servicios.filter(servicios => !gruposServiciosIds.includes(servicios.id));

    if (serviciosInvalidos.length > 0) {
      throw new HttpException(`Los siguientes servicios no pertenecen al grupo: ${serviciosInvalidos.map(s => s.nombre).join(", ")}`, HttpStatus.BAD_REQUEST);
    }
    const newUsuario = this.usuarioRepository.create({
      ...usuarioData,
      dni,
      grupo,
      role,
      servicios: servicios,
    });

    return this.usuarioRepository.save(newUsuario);
  }

  async findAll() {
    return this.usuarioRepository.find({
      relations: ["grupo", "role", "servicios", "incidencias", "guardias"],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ["grupo", "role", "servicios", "incidencias", "guardias"],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const { grupoId, roleId, serviciosIds, ...usuarioData } = updateUsuarioDto;

    const usuario = await this.usuarioRepository.preload({
      id: id,
      ...usuarioData,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (grupoId !== undefined) {
      const grupo = await this.grupoRepository.findOne({
        where: { id: grupoId },
        relations: ["servicios"],
      });

      if (!grupo) {
        throw new NotFoundException("Grupo no encontrado");
      }
      usuario.grupo = grupo;
    }

    if (roleId !== undefined) {
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
      });

      if (!role) {
        throw new NotFoundException("Role no encontrado");
      }
      usuario.role = role;
    }

    if (serviciosIds !== undefined && serviciosIds.length > 0) {
      const grupoActual = usuario.grupo;

      const serviciosIds = grupoActual.servicios.map(servicio => servicio.id);

      const servicios = await this.servicioRepository.findBy({
        id: In(serviciosIds),
      });

      if (servicios.length !== serviciosIds.length) {
        throw new NotFoundException("Uno o más servicios no encontrados");
      }

      const serviciossInvalidos = servicios.filter(servicio => !serviciosIds.includes(servicio.id));

      if (serviciossInvalidos.length > 0) {
        throw new HttpException(`Los siguientes servicios no pertenecen al grupo del usuario: ${serviciossInvalidos.map(s => s.nombre).join(", ")}`, HttpStatus.BAD_REQUEST);
      }

      usuario.servicios = servicios;
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.remove(usuario);
  }
}
