import { v4 as uuidv4 } from 'uuid';

export class Usuario {
  id: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  edad: number;
  causaDefuncion: string;
  lugarInhumacion: string;

  constructor() {
    this.id = uuidv4();
  }
}
