// src/app/services/solicitud.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../envioronment/envioroment';
import { ISolicitud } from '../interfaces/isolicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

 

  // Obtener solicitudes del usuario logueado (filtradas por el email de la sesión)
  getSolicitudesPorUsuario(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/solicitudes/empresa`, { withCredentials: true });
  }

 
  // Obtener todas las solicitudes que tiene el cliente
  getSolicitudesCliente(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/solicitudes`, {
      withCredentials: true
    });
  }

    // Eliminar una solicitud del cliente
    deleteSolicitud(idSolicitud: number):Observable<any>{
      return this.http.delete<any>(`${this.apiUrl}/usuarios/solicitudes/cancelar/${idSolicitud}`,{
        withCredentials: true
      });
    }

  //Enviar solicitud a la vacante por parte del cliente
  enviarSolicitud(dto : ISolicitud): Observable<any>{
    return this.http.post(`${this.apiUrl}/usuarios/solicitudVacante`, dto, {
      withCredentials: true
    });

  }

verDetallesSolicitud(idSolicitud : number): Observable<any>{
  return this.http.get(`${this.apiUrl}/usuarios/solicitudes/detalle/${idSolicitud}`,{
    withCredentials: true
  });
}

}
