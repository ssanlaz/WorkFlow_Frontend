import { Injectable } from '@angular/core';
import { environment } from '../../envioronment/envioroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  //ADMINISTRADORES
  getAdmin():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/admin/todos`, {
      withCredentials: true
    });
  }

  getAdminByEmail(email:string):Observable<any>{
   return this.http.get(`${this.apiUrl}/admin/${email}`, { withCredentials: true });
  }

  deleteAdmin(email: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/admin/eliminar/${email}`, { withCredentials: true });
  }
  
  createAdmin(datos: any){
    return this.http.post(`${this.apiUrl}/admin/alta`,datos, {
      withCredentials: true 
    });
  }

  updateAdmin(email:string,datos:any){
    return this.http.put(`${this.apiUrl}/admin/editar/${email}`,datos, { withCredentials: true });
  }
  


   // Obtener todos los usuarios
   getUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/todos/clientes`,{ withCredentials: true });
  }

   // Eliminar un usuario
   deleteUsuario(email: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/modificar/usuario/${email}`, null,{ withCredentials: true });
  }




  
}
