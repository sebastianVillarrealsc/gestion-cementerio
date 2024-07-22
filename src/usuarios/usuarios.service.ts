import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Usuario } from './entidades/usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario';
import * as fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

@Injectable()
export class UsuarioService {
  private readonly filePath = join(process.cwd(), 'data', 'usuarios.json');
  private usuarios: Usuario[] = [];

  constructor() {
    this.cargarDatos();
  }

  private async cargarDatos() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      this.usuarios = JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.guardarDatos();
      } else {
        throw new InternalServerErrorException('Error al leer el archivo de usuarios.');
      }
    }
  }

  private async guardarDatos() {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.usuarios, null, 2));
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el archivo de usuarios.');
    }
  }

  async crearUsuario(crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    const usuario: Usuario = { id: uuidv4(), ...crearUsuarioDto };
    this.usuarios.push(usuario);
    await this.guardarDatos();
    return usuario;
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async obtenerUsuarioPorId(id: string): Promise<Usuario> {
    const usuario = this.usuarios.find(u => u.id === id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async actualizarUsuario(id: string, actualizarUsuarioDto: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.obtenerUsuarioPorId(id);
    Object.assign(usuario, actualizarUsuarioDto);
    await this.guardarDatos();
    return usuario;
  }

  async eliminarUsuario(id: string): Promise<void> {
    const indice = this.usuarios.findIndex(u => u.id === id);
    if (indice === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    this.usuarios.splice(indice, 1);
    await this.guardarDatos();
  }

  async buscarUsuarios(query: any): Promise<Usuario[]> {
    return this.usuarios.filter(usuario => {
      return Object.keys(query).every(key => usuario[key] === query[key]);
    });
  }
}
