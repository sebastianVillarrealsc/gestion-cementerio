import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
