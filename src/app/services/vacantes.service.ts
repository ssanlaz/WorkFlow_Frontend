import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vacante } from '../interfaces/vacante';
import { Observable } from 'rxjs';
import { environment } from '../../envioronment/envioroment';
import { IFiltro } from '../interfaces/ifiltro';

@Injectable({
  providedIn: 'root'
})
export class VacantesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Obtener todas las vacantes
  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.apiUrl}/vacantes/todas`, { withCredentials:true });
  }

  //Vacantes por empresa
  getVacantesPorEmpresa():Observable<{ vacantes: Vacante[] }>{
    return this.http.get<{ vacantes: Vacante[] }>(`${this.apiUrl}/vacantes/empresa`, {withCredentials: true});
  }


  // Obtener una vacante específica por ID
  getVacanteById(idVacante: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.apiUrl}/vacantes/${idVacante}`,
    { withCredentials: true });
  }

  //buscar Vacante por filtros
  buscarVacantes(filtro: IFiltro): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/vacantes/busqueda`, filtro,
    { withCredentials: true });
  }

  // Crear una nueva vacante
  createVacante(vacanteDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vacantes/alta`, vacanteDto,
      { withCredentials: true });
  }


  // Modificar una vacante existente a cancelada
 CancelarVacante(idVacante: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/vacantes/cancelar/${idVacante}`, {},  { withCredentials: true });
  }

  AsignarVacante(idVacante: number, email: String):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/vacantes/asignar/${idVacante}/${email}`,{}, { withCredentials: true });
  }
 
  modifcarVacante(idVacante: number, vacanteDto: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/vacantes/editar/${idVacante}`,  vacanteDto,  { withCredentials: true });
  }

  
}
