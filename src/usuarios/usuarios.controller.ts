import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario';
import { Usuario } from './entidades/usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crearUsuario(@Body() crearUsuarioDto: CrearUsuarioDto): Promise<Usuario> {
    return this.usuarioService.crearUsuario(crearUsuarioDto);
  }

  @Get()
  async obtenerUsuarios(): Promise<Usuario[]> {
    return this.usuarioService.obtenerUsuarios();
  }

  @Get(':id')
  async obtenerUsuarioPorId(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.obtenerUsuarioPorId(id);
  }

  @Put(':id')
  async actualizarUsuario(@Param('id') id: string, @Body() actualizarUsuarioDto: ActualizarUsuarioDto): Promise<Usuario> {
    return this.usuarioService.actualizarUsuario(id, actualizarUsuarioDto);
  }

  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string): Promise<void> {
    return this.usuarioService.eliminarUsuario(id);
  }

  @Patch(':id')
  async modificarUsuario(@Param('id') id: string, @Body() actualizarUsuarioDto: ActualizarUsuarioDto): Promise<Usuario> {
    return this.usuarioService.actualizarUsuario(id, actualizarUsuarioDto);
  }

  @Get('buscar')
  async buscarUsuarios(@Query() query: any): Promise<Usuario[]> {
    return this.usuarioService.buscarUsuarios(query);
  }
}
