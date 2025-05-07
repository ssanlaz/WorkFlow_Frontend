import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { authGuard } from './guards/auth.guard';
import { HomeClienteComponent } from './pages/home-cliente/home-cliente.component';
import { HomeEmpresaComponent } from './pages/home-empresa/home-empresa.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublicarVacanteComponent } from './pages/publicar-vacante/publicar-vacante.component';
import { SolicitudVacantesComponent } from './pages/solicitud-vacantes/solicitud-vacantes.component';
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa.component';
import { DetallesSolicitudClienteComponent } from './pages/detalles-solicitud-cliente/detalles-solicitud-cliente.component';
import { SolicitudVacanteClienteComponent } from './pages/solicitud-vacante-cliente/solicitud-vacante-cliente.component';
import { VacantesComponent } from './pages/vacantes/vacantes.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { AltaEmpresaComponent } from './pages/alta-empresa/alta-empresa.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AltaAdminComponent } from './pages/alta-admin/alta-admin.component';
import { AltaCategoriaComponent } from './pages/alta-categoria/alta-categoria.component';
import { VacantesClienteComponent } from './pages/vacantes-cliente/vacantes-cliente.component';
import { DetallesVacantesComponent } from './pages/detalles-vacantes/detalles-vacantes.component';



export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'vacantes',component:VacantesComponent},

  // Rutas protegidas con el AuthGuard
  { path: 'home-cliente', component: HomeClienteComponent, canActivate: [authGuard] },
  { path: 'home-empresa', component: HomeEmpresaComponent, canActivate: [authGuard] },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [authGuard] },

  // Rutas empresa
  { path: 'publicar-vacante', component: PublicarVacanteComponent, canActivate: [authGuard] },
  { path: 'solicitud-vacantes', component: SolicitudVacantesComponent, canActivate: [authGuard] },
  { path: 'perfil-empresa', component: PerfilEmpresaComponent, canActivate: [authGuard] },
  { path: 'perfil-empresa/:idEmpresa', component: PerfilEmpresaComponent, canActivate: [authGuard] },
  { path: 'detallesVacantes/:idVacante', component: DetallesVacantesComponent, canActivate: [authGuard] },
  { path: 'editarEmpresa/:idEmpresa', component: AltaEmpresaComponent, canActivate: [authGuard] },
  { path: 'editarVacante/:idVacante', component: PublicarVacanteComponent, canActivate: [authGuard] },

  // Rutas cliente
  { path: 'home-cliente', component: HomeClienteComponent, canActivate: [authGuard] },
  { path: 'vacantes-cliente', component:VacantesClienteComponent, canActivate: [authGuard] },
  { path: 'detallesSolicitud/:idSolicitud', component:DetallesSolicitudClienteComponent, canActivate: [authGuard] },
  { path: 'inscribirme/:idVacante', component: SolicitudVacanteClienteComponent, canActivate: [authGuard] },
 


  //Rutas de admin
  { path: 'empresas', component: EmpresasComponent, canActivate: [authGuard] },
  { path: 'altaEmpresa', component: AltaEmpresaComponent, canActivate: [authGuard] },
  { path: 'detallesEmpresa/:idEmpresa', component: PerfilEmpresaComponent, canActivate: [authGuard] },
  { path: 'editarEmpresa/:idEmpresa', component: AltaEmpresaComponent, canActivate: [authGuard] },
  { path: 'administradores', component: HomeAdminComponent, canActivate: [authGuard] },
  { path: 'editarAdmin/:email', component: AltaAdminComponent, canActivate: [authGuard] },
  { path: 'detallesAdmin/:email', component: AltaAdminComponent, canActivate: [authGuard] },
  { path: 'altaAdmin', component: AltaAdminComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard] },
  { path: 'crear-categoria', component: AltaCategoriaComponent, canActivate: [authGuard] },
  { path: 'editar-categoria/:idCategoria', component: AltaCategoriaComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },




  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
