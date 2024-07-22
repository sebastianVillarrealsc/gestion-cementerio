// src/parcelas/entidades/parcela.entity.ts
export class Parcela {
    id: string;
    zona: string;
    fecha_pago: string; // Puedes usar Date si prefieres
    fecha_vencimiento: string; // Puedes usar Date si prefieres
    ocupada: boolean;
  }
  