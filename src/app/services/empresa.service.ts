import { Injectable } from '@angular/core';
import { environment } from '../../envioronment/envioroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  // Obtener todas las empresas
  getEmpresas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/todas/empresas`, { withCredentials: true });
  }

  // Obtener empresa por ID
  getEmpresaById(idEmpresa: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/empresa/${idEmpresa}`, { withCredentials: true });
  }

  // Crear una nueva empresa
  createEmpresa(data: { empresaDto: any, registroDto: any }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/alta/empresa`, data, { withCredentials: true });
  }

  // Modificar una empresa existente
  updateEmpresa(idEmpresa: number, empresa: Empresa): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/editar/empresa/${idEmpresa}`, empresa, { withCredentials: true });
  }

  // Eliminar una empresa
  deleteEmpresa(idEmpresa: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/eliminar/empresa/${idEmpresa}`, { withCredentials: true });
  }


}
