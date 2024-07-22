import { Injectable, NotFoundException } from '@nestjs/common';
import { Responsable } from './entidades/responsable.entity';
import { CrearResponsableDto } from './dto/crear-responsables.dto';
import { ActualizarResponsableDto } from './dto/actualizar-responsable.dto';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class ResponsableService {
  private readonly filePath = join(process.cwd(), 'data', 'responsables.json');
  private responsables: Responsable[] = [];

  constructor() {
    this.cargarDatos();
  }

  private async cargarDatos() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.responsables = JSON.parse(data);
    } catch (error) {
      this.responsables = [];
    }
  }

  private async guardarDatos() {
    await fs.writeFile(this.filePath, JSON.stringify(this.responsables, null, 2));
  }

  async crearResponsable(crearResponsableDto: CrearResponsableDto): Promise<Responsable> {
    const responsable: Responsable = { id: uuidv4(), ...crearResponsableDto };
    this.responsables.push(responsable);
    await this.guardarDatos();
    return responsable;
  }

  async obtenerResponsables(): Promise<Responsable[]> {
    return this.responsables;
  }

  async obtenerResponsablePorId(id: string): Promise<Responsable> {
    const responsable = this.responsables.find(r => r.id === id);
    if (!responsable) {
      throw new NotFoundException(`Responsable con ID ${id} no encontrado`);
    }
    return responsable;
  }

  async actualizarResponsable(id: string, actualizarResponsableDto: ActualizarResponsableDto): Promise<Responsable> {
    const responsable = await this.obtenerResponsablePorId(id);
    Object.assign(responsable, actualizarResponsableDto);
    await this.guardarDatos();
    return responsable;
  }

  async eliminarResponsable(id: string): Promise<void> {
    const indice = this.responsables.findIndex(r => r.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Responsable con ID ${id} no encontrado`);
    }
    this.responsables.splice(indice, 1);
    await this.guardarDatos();
  }

  async buscarResponsables(query: any): Promise<Responsable[]> {
    return this.responsables.filter(responsable => {
      return Object.keys(query).every(key => responsable[key] === query[key]);
    });
  }
}
