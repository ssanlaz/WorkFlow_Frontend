export interface Vacante {
  idVacante: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  salario: number;
  estado: 'CREADA' | 'CANCELADA' | 'CUBIERTA';
  destacado: boolean;
  imagen: string;
  detalles: string;

  empresa?: {
    idEmpresa: number;
    nombre?: string;
  };
  categoria: {
    idCategoria: number;
    nombre: string;
    descripcion: string;
  }
  ciudad ?: string;
 idEmpresa?:number;
}
