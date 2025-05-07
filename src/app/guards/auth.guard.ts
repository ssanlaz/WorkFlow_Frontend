import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);



  const requestedPath = '/' + (route.routeConfig?.path || '');



  const rutasPermitidas: { [key: string]: string[] } = {
    cliente: ['/home-cliente','/vacantes-cliente','/inscribirme/:idVacante','/detallesSolicitud/:idSolicitud'],

    empresa: ['/home-empresa', '/publicar-vacante', '/solicitud-vacantes', '/perfil-empresa','/perfil-empresa/:idEmpresa',
      '/detallesVacantes/:idVacante','/editarEmpresa/:idEmpresa','/editarVacante/:idVacante'],

    admon : ['/home-admin', '/home-cliente', '/home-empresa','/empresas','/altaEmpresa','/detallesEmpresa/:idEmpresa',
      '/editarEmpresa/:idEmpresa','/administradores','/categorias','/usuarios','/altaAdmin','/editarAdmin/:email'
      ,'/detallesAdmin/:email','/crear-categoria','/editar-categoria/:idCategoria']
  };

  return authService.getUserRole().pipe(
    take(1), // Solo tomamos la primera emisión
    map((role) => {
      if (!role) {
        router.navigate(['/home']);
        return false;

    }
    if (rutasPermitidas[role]?.includes(requestedPath)) {
         console.log(' Acceso permitido');
        return true;
    } else {
        console.log('Acceso denegado, redirigiendo al home');
       router.navigate(['/home']);
      return false;
    }
})
);



}








