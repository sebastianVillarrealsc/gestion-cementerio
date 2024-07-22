import { v4 as uuidv4 } from 'uuid';

export class Responsable {
  id: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
  direccion: string;
  email: string;
  telefono: string;

  constructor() {
    this.id = uuidv4();
  }
}
