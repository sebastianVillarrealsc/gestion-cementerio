// src/parcelas/parcela.service.ts
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Parcela } from './entidades/parcela.entity';
import { CrearParcelaDto } from './dto/crear-parcela.dto';
import { ActualizarParcelaDto } from './dto/actualizar-parcela.dto';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class ParcelaService {
  private readonly filePath = join(process.cwd(), 'data', 'parcelas.json');
  private parcelas: Parcela[] = [];

  constructor() {
    this.cargarDatos();
  }

  private async cargarDatos() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.parcelas = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.guardarDatos();
      } else {
        throw new InternalServerErrorException('Error al leer el archivo de parcelas.');
      }
    }
  }

  private async guardarDatos() {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.parcelas, null, 2));
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el archivo de parcelas.');
    }
  }

  async crearParcela(crearParcelaDto: CrearParcelaDto): Promise<Parcela> {
    const parcela: Parcela = { id: uuidv4(), ...crearParcelaDto };
    this.parcelas.push(parcela);
    await this.guardarDatos();
    return parcela;
  }

  async obtenerParcelas(): Promise<Parcela[]> {
    return this.parcelas;
  }

  async obtenerParcelaPorId(id: string): Promise<Parcela> {
    const parcela = this.parcelas.find(p => p.id === id);
    if (!parcela) {
      throw new NotFoundException(`Parcela con ID ${id} no encontrada`);
    }
    return parcela;
  }

  async actualizarParcela(id: string, actualizarParcelaDto: ActualizarParcelaDto): Promise<Parcela> {
    const parcela = await this.obtenerParcelaPorId(id);
    Object.assign(parcela, actualizarParcelaDto);
    await this.guardarDatos();
    return parcela;
  }

  async eliminarParcela(id: string): Promise<void> {
    const indice = this.parcelas.findIndex(p => p.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Parcela con ID ${id} no encontrada`);
    }
    this.parcelas.splice(indice, 1);
    await this.guardarDatos();
  }

  async buscarParcelas(query: any): Promise<Parcela[]> {
    return this.parcelas.filter(parcela => {
      return Object.keys(query).every(key => parcela[key] === query[key]);
    });
  }
}
