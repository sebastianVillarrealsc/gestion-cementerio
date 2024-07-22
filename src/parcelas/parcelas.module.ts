// src/parcelas/parcela.module.ts
import { Module } from '@nestjs/common';
import { ParcelaService } from './parcelas.service';
import { ParcelaController } from './parcelas.controller';

@Module({
  providers: [ParcelaService],
  controllers: [ParcelaController],
})
export class ParcelaModule {}
