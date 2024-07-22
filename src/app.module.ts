import { Module } from '@nestjs/common';
import { ZonasModule } from './zonas/zonas.module';
import { UsuarioModule } from './usuarios/usuarios.module';
import { ResponsableModule } from './responsables/responsable.module';
import { ParcelaModule } from './parcelas/parcelas.module';

@Module({
  imports: [ZonasModule, UsuarioModule, ResponsableModule, ParcelaModule],
})
export class AppModule {}
