// src/parcelas/parcela.controller.ts
import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query } from '@nestjs/common';
import { ParcelaService } from './parcelas.service';
import { CrearParcelaDto } from './dto/crear-parcela.dto';
import { ActualizarParcelaDto } from './dto/actualizar-parcela.dto';
import { Parcela } from './entidades/parcela.entity';

@Controller('parcelas')
export class ParcelaController {
  constructor(private readonly parcelaService: ParcelaService) {}

  @Post()
  async crearParcela(@Body() crearParcelaDto: CrearParcelaDto): Promise<Parcela> {
    return this.parcelaService.crearParcela(crearParcelaDto);
  }

  @Get()
  async obtenerParcelas(): Promise<Parcela[]> {
    return this.parcelaService.obtenerParcelas();
  }

  @Get(':id')
  async obtenerParcelaPorId(@Param('id') id: string): Promise<Parcela> {
    return this.parcelaService.obtenerParcelaPorId(id);
  }

  @Put(':id')
  async actualizarParcela(@Param('id') id: string, @Body() actualizarParcelaDto: ActualizarParcelaDto): Promise<Parcela> {
    return this.parcelaService.actualizarParcela(id, actualizarParcelaDto);
  }

  @Delete(':id')
  async eliminarParcela(@Param('id') id: string): Promise<void> {
    return this.parcelaService.eliminarParcela(id);
  }

  @Patch(':id')
  async modificarParcela(@Param('id') id: string, @Body() actualizarParcelaDto: ActualizarParcelaDto): Promise<Parcela> {
    return this.parcelaService.actualizarParcela(id, actualizarParcelaDto);
  }

  @Get('buscar')
  async buscarParcelas(@Query() query: any): Promise<Parcela[]> {
    return this.parcelaService.buscarParcelas(query);
  }
}
