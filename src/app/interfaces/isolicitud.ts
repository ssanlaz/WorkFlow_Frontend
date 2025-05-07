export interface ISolicitud {
  idSolicitud?:number;
    fecha: string;
    comentarios: string;
    archivo: string;
    estado : boolean;
    curriculum: string;
    idVacante: number;
    emailUsuario: string;
    nombreVacante?:string;
    nombreEmpresa?:string;
}
