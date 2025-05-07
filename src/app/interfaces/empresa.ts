export interface Empresa {
    idEmpresa: number;
    nombreEmpresa: string;
    cif: string;
    direccionFiscal: string;
    pais: string;
    ciudad: string;
    email?: string; //registro
    usuario?: {
      email: string;
    };
}
