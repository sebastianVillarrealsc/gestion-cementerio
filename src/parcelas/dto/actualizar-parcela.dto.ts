
  
  // src/parcelas/dto/actualizar-parcela.dto.ts
  import { PartialType } from '@nestjs/mapped-types';
  import { CrearParcelaDto } from './crear-parcela.dto';
  
  export class ActualizarParcelaDto extends PartialType(CrearParcelaDto) {}
  