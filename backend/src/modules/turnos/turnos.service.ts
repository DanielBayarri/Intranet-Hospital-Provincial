import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTurnoDto } from "./dto/create-turno.dto";
import { UpdateTurnoDto } from "./dto/update-turno.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Turno } from "./entities/turno.entity";
import { Repository } from "typeorm";

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turno)
    private turnoRepository: Repository<Turno>,
  ) {}

  create(turno: CreateTurnoDto) {
    const newTurno = this.turnoRepository.create(turno);
    return this.turnoRepository.save(newTurno);
  }

  async findAll() {
    return this.turnoRepository.find({
      relations: ["incidencias"],
    });
  }

  async findOne(id: number) {
    const turno = await this.turnoRepository.findOne({
      where: { id },
      relations: ["incidencias"],
    });

    if (!turno) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }

    return turno;
  }

  async update(id: number, updateTurnoDto: UpdateTurnoDto) {
    const turno = await this.turnoRepository.preload({
      id: id,
      ...updateTurnoDto,
    });

    if (!turno) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }

    return this.turnoRepository.save(turno);
  }

  async remove(id: number) {
    const turno = await this.turnoRepository.findOne({ where: { id } });
    if (!turno) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }
    return this.turnoRepository.remove(turno);
  }
}
