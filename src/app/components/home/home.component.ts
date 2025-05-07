import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IFiltro } from '../../interfaces/ifiltro';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  empresas = [
    { imagen: 'amazon.png', nombre: 'Amazon' },
    { imagen: 'bbva.png', nombre: 'Bbva' },
    { imagen: 'google.png', nombre: 'Google' },
    { imagen: 'inditex.png', nombre: 'Inditex' },
    { imagen: 'mapfre.png', nombre: 'Mapfre' },
    { imagen: 'microsoft.png', nombre: 'Microsoft' },
    { imagen: 'telefonica.png', nombre: 'Telefonica' },
    { imagen: 'uber.png', nombre: 'Uber' }
  ];

  trabajos = [
    { imagen: 'Informatica.jpg', titulo: 'Informática', tipo: 'informatica'},
    { imagen: 'ciencia.jpg', titulo: 'Ciencia', tipo: 'ciencia'},
    { imagen: 'Educacion.jpg', titulo: 'Educación', tipo: 'educacion'},
    { imagen: 'Ingeniería.jpg', titulo: 'Ingeniería', tipo: 'ingenierìa'},
    { imagen: 'juridico.jpg', titulo: 'Jurídico', tipo: 'juridico'},
    { imagen: 'medioambiente.jpg', titulo: 'Medioambiente', tipo: 'medioambiente'},
    { imagen: 'reparaciones.jpg', titulo: 'Reparaciones', tipo: 'reparaciones'},
    { imagen: 'salud.jpg', titulo: 'Salud', tipo: 'salud'}
  ];
  constructor(private router: Router) {}

  filtro: IFiltro = {};
  private authService = inject(AuthService);

  buscarTrabajo(tipo: string) {
    console.log('Buscando trabajo de:', tipo);
    this.router.navigate(['/filtros'], { queryParams: { tipo } });
  }

  buscarYRedirigir() {
    const estaLogueado = this.authService['isAuthenticatedSubject'].getValue();

    if (!estaLogueado) {
      alert('Debes iniciar sesión para buscar vacantes.');
      return;
    }
    this.router.navigate(['/vacantes'], {
      state:{ filtro:this.filtro}
     });
    }




}
