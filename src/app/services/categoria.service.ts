import { Injectable } from '@angular/core';
import { environment } from '../../envioronment/envioroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/todas`, { withCredentials: true });
  }

  getCategoriaById(idCategoria:number): Observable<any>{
 return this.http.get(`${this.apiUrl}/categorias/${idCategoria}`, { withCredentials: true });
  }

  eliminarCategoria(idCategoria: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias/eliminar/${idCategoria}`, { withCredentials: true });
  }
  
  createCategoria(categoria: any):Observable<any>{
    return this.http.post(`${this.apiUrl}/categorias/alta`, categoria,{ withCredentials: true });
  }

 updateCategoria(idCategoria: number,categoriaDto: any):Observable<any>{
  return this.http.put(`${this.apiUrl}/categorias/modificar/${idCategoria}`,categoriaDto,{ withCredentials: true });
 }
}
