import { PartialType } from '@nestjs/mapped-types';
import { CrearResponsableDto } from './crear-responsables.dto';

export class ActualizarResponsableDto extends PartialType(CrearResponsableDto) {}
