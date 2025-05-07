import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Icategoria } from '../../interfaces/icategoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit{

  categorias: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private router:           Router
  ){}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('Error al cargar categorías', err)
    });

  }

  eliminarCategoria(idCategoria: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(idCategoria).subscribe({
        next: () => {
          alert('Categoría eliminada con éxito');
          this.ngOnInit(); // Recargar lista
        },
        error: err => {
          console.error('Error al eliminar la categoría', err);
          alert('Error al eliminar la categoría');
        }
      });
    }
  }

}
