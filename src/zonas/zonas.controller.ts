import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import { CrearZonaDto } from './dto/crear-zona.dto';
import { ActualizarZonaDto } from './dto/actualizar-zona.dto';

@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Get()
  obtenerTodas() {
    return this.zonasService.obtenerTodas();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.zonasService.obtenerPorId(Number(id));
  }

  @Get('buscar')
  obtenerPorNombre(@Query('nombre') nombre: string) {
    return this.zonasService.obtenerPorNombre(nombre);
  }

  @Post()
  crear(@Body() crearZonaDto: CrearZonaDto) {
    return this.zonasService.crear(crearZonaDto);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() actualizarZonaDto: ActualizarZonaDto) {
    return this.zonasService.actualizar(Number(id), actualizarZonaDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    this.zonasService.eliminar(Number(id));
    return { message: `Zona con ID ${id} eliminada correctamente` };
  }
}
