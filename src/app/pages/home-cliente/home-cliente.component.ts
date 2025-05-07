import { Component, inject } from '@angular/core';
import { IFiltro } from '../../interfaces/ifiltro';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-cliente.component.html',
  styleUrl: './home-cliente.component.css'
})
export class HomeClienteComponent {

  filtro: IFiltro = {};

  private router = inject(Router);

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

  buscarYRedirigir() {
    this.router.navigate(['/vacantes'], {
     state:{ filtro:this.filtro}
    });
  };



  buscarTrabajo(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
