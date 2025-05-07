import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-categoria',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './alta-categoria.component.html',
  styleUrl: './alta-categoria.component.css'
})
export class AltaCategoriaComponent {


  formulario!: FormGroup;
idCategoria: number | null = null;
private route = inject(ActivatedRoute)


  constructor(private fb: FormBuilder, 
    private categoriaService: CategoriaService, 
    private router: Router) {}


    ngOnInit(): void {
      this.formulario = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      });

      //Vemos si es editar la categoria
      this.route.paramMap.subscribe(params => {
        const id = params.get('idCategoria');
        if (id) {
          this.idCategoria = +id;
          this.categoriaService.getCategoriaById(this.idCategoria).subscribe({
            next: categoria => this.formulario.patchValue(categoria),
            error: err => console.error('Error al cargar categoría', err)
          });
        }
      });
    }



registrarCategoria() : void {
  if (this.formulario.invalid) return;

  const { nombre, descripcion } = this.formulario.value;
  const categoriaDto = { nombre, descripcion };

 //Si queremos modfiicarla 
  if (this.idCategoria) {
    this.categoriaService.updateCategoria(this.idCategoria, categoriaDto).subscribe({
      next: () => {
        alert('Categoría actualizada correctamente');
        this.router.navigate(['/categorias']);
      },
      error: err => {
        console.error(err);
        alert('Error al actualizar categoría');
      }
    });

  }else{

  this.categoriaService.createCategoria(categoriaDto).subscribe({
    next: (res) => {
      alert(res.mensaje || 'Categoría registrada correctamente');
      this.router.navigate(['/categorias']);
    },
    error: (err) => {
      console.error(err);
      alert('Error al registrar categoría');
    }
  });
}
}




}
