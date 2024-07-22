import { Module } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { ResponsableController } from './responsable.controller';

@Module({
  providers: [ResponsableService],
  controllers: [ResponsableController],
})
export class ResponsableModule {}
