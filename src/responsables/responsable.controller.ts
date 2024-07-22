import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { CrearResponsableDto } from './dto/crear-responsables.dto';
import { ActualizarResponsableDto } from './dto/actualizar-responsable.dto';
import { Responsable } from './entidades/responsable.entity';

@Controller('responsables')
export class ResponsableController {
  constructor(private readonly responsableService: ResponsableService) {}

  @Post()
  async crearResponsable(@Body() crearResponsableDto: CrearResponsableDto): Promise<Responsable> {
    return this.responsableService.crearResponsable(crearResponsableDto);
  }

  @Get()
  async obtenerResponsables(): Promise<Responsable[]> {
    return this.responsableService.obtenerResponsables();
  }

  @Get(':id')
  async obtenerResponsablePorId(@Param('id') id: string): Promise<Responsable> {
    return this.responsableService.obtenerResponsablePorId(id);
  }

  @Put(':id')
  async actualizarResponsable(@Param('id') id: string, @Body() actualizarResponsableDto: ActualizarResponsableDto): Promise<Responsable> {
    return this.responsableService.actualizarResponsable(id, actualizarResponsableDto);
  }

  @Delete(':id')
  async eliminarResponsable(@Param('id') id: string): Promise<void> {
    return this.responsableService.eliminarResponsable(id);
  }

  @Patch(':id')
  async modificarResponsable(@Param('id') id: string, @Body() actualizarResponsableDto: ActualizarResponsableDto): Promise<Responsable> {
    return this.responsableService.actualizarResponsable(id, actualizarResponsableDto);
  }

  @Get('buscar')
  async buscarResponsables(@Query() query: any): Promise<Responsable[]> {
    return this.responsableService.buscarResponsables(query);
  }
}
