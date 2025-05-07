import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacantesService } from '../../services/vacantes.service';
import { Vacante } from '../../interfaces/vacante';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './publicar-vacante.component.html',
  styleUrl: './publicar-vacante.component.css'
})
export class PublicarVacanteComponent {

private vacanteSer = inject(VacantesService);
private categoriaSer = inject(CategoriaService);
private router = inject(Router);
private route = inject(ActivatedRoute);

idVacante: number | null = null;

vacante: any = {
  idVacante: 0,
  nombre: '',
  descripcion: '',
  fecha: new Date(), // opcional, el backend puede ponerla
  salario: 0,
  estado: 'CREADA',
  destacado: false,
  imagen: '',
  detalles: '',
 idCategoria: 0,
 idEmpresa: 0,
  ciudad : '',

  }


  categorias = [
    { idCategoria: 1, nombre: 'Sanidad' },
    { idCategoria: 2, nombre: 'Educación' },
    { idCategoria: 3, nombre: 'Hostelería' },
    { idCategoria: 4, nombre: 'Marketing' },
    { idCategoria: 5, nombre: 'Legal' },
    { idCategoria: 6, nombre: 'Construcción' },
    { idCategoria: 7, nombre: 'Recursos Humanos' },
    { idCategoria: 8, nombre: 'Atención al Cliente' },
    { idCategoria: 9, nombre: 'Ventas' },
    { idCategoria: 10, nombre: 'Ciencia' },
    { idCategoria: 11, nombre: 'Agricultura' },
    { idCategoria: 12, nombre: 'Ciberseguridad' },
    { idCategoria: 13, nombre: 'Logística' },
    { idCategoria: 14, nombre: 'Diseño Gráfico' },
    { idCategoria: 15, nombre: 'Videojuegos' }
  ];

ngOnInit(): void {
  this.cargarCategorias();

  //modo editar vacante por la empresa
  const id = this.route.snapshot.paramMap.get('idVacante');
  if (id) {
    this.idVacante = +id;
    this.vacanteSer.getVacanteById(this.idVacante).subscribe({
      next: (v) => {
        this.vacante = {
          ...v,
          idCategoria: v.categoria?.idCategoria ?? 0,
          idEmpresa: v.empresa?.idEmpresa ?? 0,
          fecha: v.fecha ? new Date(v.fecha) : new Date(),      
          estado: v.estado ?? 'CREADA' 
        };
      },
      error: (err) => {
        console.error('Error al cargar vacante:', err);
      }
    });
  }
}



cargarCategorias(): void {
  this.categoriaSer.getCategorias().subscribe({
    next: (data) => {
      console.log('Categorías cargadas:', data);
    
      this.categorias = data;
    },
    error: (err) => {
      console.error('Error al cargar categorías', err);
    }
  });
}

guardarVacante(): void {
  const vacanteDto = {
    nombre: this.vacante.nombre,
    descripcion: this.vacante.descripcion,
    fecha: this.vacante.fecha, 
    salario: this.vacante.salario,
    destacado: this.vacante.destacado,
    imagen: this.vacante.imagen,
    detalles: this.vacante.detalles,
    ciudad: this.vacante.ciudad,
    idCategoria: this.vacante.idCategoria,
    idEmpresa:this.vacante.idEmpresa,
    estado: this.vacante.estado,
  };

  //Editarla

  if (this.idVacante) {
    this.vacanteSer.modifcarVacante(this.idVacante, vacanteDto).subscribe({
      next: (res: any) => {
        alert(res.mensaje || 'Vacante actualizada correctamente');
        this.router.navigate(['/perfil-empresa']);
      },
      error: (err) => {
        console.error('Error al actualizar vacante', err);
        alert('Error al actualizar vacante');
      }
    });
  }else{

  this.vacanteSer.createVacante(vacanteDto).subscribe({
    next : (res : any) => {
      alert(res.mensaje || 'Vacante creada con exito');
      this.router.navigate(['/home-empresa']);
    },
    error: (err) => {
      console.error('Error al crear vacante', err);
      alert('Error al crear la vacante');
    }
  })
}

}

}