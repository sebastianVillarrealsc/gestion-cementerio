import { Injectable, NotFoundException } from '@nestjs/common';
import { CrearZonaDto } from './dto/crear-zona.dto';
import { ActualizarZonaDto } from './dto/actualizar-zona.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ZonasService {
  private readonly filePath = path.resolve(__dirname, 'zonas.json');

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      const initialData = [];
      fs.writeFileSync(this.filePath, JSON.stringify(initialData, null, 2));
    }
  }

  private leerArchivo(): any[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
        return [];
      }
      throw new Error('Error al leer el archivo JSON');
    }
  }

  private escribirArchivo(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  obtenerTodas(): any[] {
    return this.leerArchivo();
  }

  obtenerPorId(id: number): any {
    const zonas = this.leerArchivo();
    const zona = zonas.find(z => z.id === id);
    if (!zona) {
      throw new NotFoundException(`Zona con ID ${id} no encontrada`);
    }
    return zona;
  }

  obtenerPorNombre(nombre: string): any {
    const zonas = this.leerArchivo();
    const zona = zonas.find(z => z.nombre.toLowerCase() === nombre.toLowerCase());
    if (!zona) {
      throw new NotFoundException(`Zona con nombre ${nombre} no encontrada`);
    }
    return zona;
  }

  crear(crearZonaDto: CrearZonaDto): any {
    const zonas = this.leerArchivo();
    const id = zonas.length ? zonas[zonas.length - 1].id + 1 : 1;
    const nuevaZona = { id, ...crearZonaDto };
    zonas.push(nuevaZona);
    this.escribirArchivo(zonas);
    return nuevaZona;
  }

  actualizar(id: number, actualizarZonaDto: ActualizarZonaDto): any {
    const zonas = this.leerArchivo();
    const index = zonas.findIndex(z => z.id === id);
    if (index === -1) {
      throw new NotFoundException(`Zona con ID ${id} no encontrada`);
    }
    zonas[index] = { ...zonas[index], ...actualizarZonaDto };
    this.escribirArchivo(zonas);
    return zonas[index];
  }

  eliminar(id: number): void {
    let zonas = this.leerArchivo();
    const index = zonas.findIndex(z => z.id === id);
    if (index === -1) {
      throw new NotFoundException(`Zona con ID ${id} no encontrada`);
    }
    zonas = zonas.filter(z => z.id !== id);
    this.escribirArchivo(zonas);
  }
}
