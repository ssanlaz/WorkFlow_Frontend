export interface Solicitud {
  id_solicitud: number;
  fecha: string;
  archivo: string;
  comentarios: string;
  estado: number;
  curriculum: string;
  id_Vacante: number;
  email: string;
  nombre?: string;
}
