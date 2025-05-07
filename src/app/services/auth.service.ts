import { inject, Injectable } from '@angular/core';
import { environment } from '../../envioronment/envioroment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private url: string = environment.apiUrl;

  http = inject(HttpClient);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación
  private userRoleSubject        = new BehaviorSubject<string | null>(null); // Rol del usuario

  private userEmail: string = '';

  constructor() {

    this.checkAuthBack();

  }



  //Este metodo hara una peticion activa al back, y si hay sesion activa, recupera el rol y lo notifica al BehaviorSubject
  checkAuthBack():void{
    this.http.get<any>(`${this.url}/auth/usuario`,{
      withCredentials : true})
      .subscribe({
        next: res => {
          const rol = res.rol.toLowerCase();
          this.userEmail = res.email;
          this.setAuthEstado(true, rol);
        },
        error: err => {
          this.setAuthEstado(false, null);
        }
      });
  }

  //Para sacar el email del usuario logueado
  getEmail():string{
    return this.userEmail;
  }

  
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password }, {
      withCredentials: true // 💡 Necesario para enviar la cookie de sesión, hace que envie y reciba cookies de sesion y el back lo guarda y maneja la sesion correctamente
    }).pipe(
      tap((res : any) => {
        const rolNormal = res.rol.toLowerCase();
         // Actualizamos el subject, notificamos a los guards que el usuario esta autenticado
         this.userRoleSubject.next(rolNormal);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }


//Borrar la sesion del navegador
logout() {
 return this.http.post(`${this.url}/logout`,{},
  {withCredentials:true}).pipe(
    tap(() => {
      this.setAuthEstado(false,null);
    })
  );
  }


  registro(datos:any){
    return this.http.post(`${this.url}/usuarios/registro`, datos, {
      withCredentials: true
    });
  }


  //Chequear sesion
  checkSession() {
    return this.http.get(`${this.url}/session-status`, { withCredentials: true });
  }


  //Es un metodo para verificar y notificar a los BehaviorSubject
  setAuthEstado(isLoggedIn: boolean, role :string | null){
    this.isAuthenticatedSubject.next(isLoggedIn);
    this.userRoleSubject.next(role);
  }


  //Crear un metodo para acceder al valor del rol, que se comparten entre componentes
  getUserRole(): Observable<string | null>{
    return this.userRoleSubject.asObservable();
  }


  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

 
}



