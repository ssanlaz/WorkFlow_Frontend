import { Component, inject, OnInit } from '@angular/core';
import { IFiltro } from '../../interfaces/ifiltro';
import { AuthService } from '../../services/auth.service';
import { VacantesService } from '../../services/vacantes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './vacantes.component.html',
  styleUrl: './vacantes.component.css'
})
export class VacantesComponent implements OnInit{

  filtro: IFiltro = {};
  vacantes: any[] = [];
  authService = inject(AuthService);

  constructor(private vacantesService: VacantesService){}

  //Array de categorias de la BBDD
  categorias: string[] = [
    'Sanidad',
    'Educación',
    'Hostelería',
    'Marketing',
    'Legal',
    'Construcción',
    'Recursos Humanos',
    'Atención al Cliente',
    'Ventas',
    'Ciencia',
    'Agricultura',
    'Ciberseguridad',
    'Logística',
    'Diseño Gráfico',
    'Videojuegos'
  ];

  salarios: number[] = [ 10000,20000, 30000, 40000];

  ngOnInit(): void {
    this.verificarSesion();

    const filtroRecibido = history.state.filtro as IFiltro;

    if(filtroRecibido && (filtroRecibido.nombreEmpresa || filtroRecibido.ciudad || filtroRecibido.categoria)){
      this.filtro = filtroRecibido;
      this.buscarVacantes();
    }else {
      this.buscarVacantes();
    }
  }

  verificarSesion() {
    this.authService.checkSession().subscribe(
     response => {
       console.log('Sesión activa:', response);
     },
     error => {
       console.error('Error verificando sesión:', error);
     }
   );
 }

  seleccionarCategoria(cat: string): void {
    this.filtro.categoria = cat;
    this.buscarVacantes();
  }

  buscarVacantes (): void {
    console.log("Filtro enviado:", this.filtro);
    this.vacantesService.buscarVacantes(this.filtro).subscribe({
      next : (resp) => {
        this.vacantes = resp.vacantes.map((v: any) => {
          let imagen = 'assets/default.png';
          const categoria = normalizarTexto(v.nombreCategoria);
          console.log("VACANTE RECIBIDA:", v);
          switch (categoria) {
            case 'sanidad':
              imagen = 'assets/img/salud.jpg';
              break;
            case 'educacion':
              imagen = 'assets/img/inditex.jpeg';
              break;
            case 'hosteleria':
              imagen = 'assets/img/hosteleria.jpg';
              break;
            case 'marketing':
              imagen = 'assets/logo/amazon.png';
              break;
            case 'legal':
              imagen = 'assets/logo/bbva.png';
              break;
            case 'construccion':
              imagen = 'assets/logo/microsoft.png';
              break;
           case 'recursos humanos':
            imagen = 'assets/logo/google.png';
            break;
          case 'atencion al cliente':
            imagen = 'assets/logo/uber.png';
            break;
          case 'ventas':
            imagen = 'assets/logo/mapfre.png';
            break;
          case 'ciencia':
            imagen = 'assets/img/ciencia.jpg';
            break;
         case 'agricultura':
          imagen = 'assets/img/agriculturadig.jpg';
            break;
          case 'ciberseguridad':
         imagen = 'assets/img/Informatica.jpg';
           break;
          case 'logistica':
          imagen = 'assets/logo/uber.png';
            break;
          case  'diseno grafico':
          imagen = 'assets/logo/amazon.png';
          break;
          case 'videojuegos':
         imagen = 'assets/logo/microsoft.png';
           break;

      }
      return { ...v,imagen,}
      });
      },
      error: (err) => {
        console.error('Error al buscar vacantes', err);
      }
    });

  }



}
//FUNCION PARA NORMALIZAR EL TEXTO Y EL FILTRADO , PARA QUE NO DISTINGA MAYUSCULAS DE MINUSCULAS NI TILDES ...
function normalizarTexto(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
