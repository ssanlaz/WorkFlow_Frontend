import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vacante } from '../../interfaces/vacante';
import { VacantesService } from '../../services/vacantes.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-empresa',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home-empresa.component.html',
  styleUrl: './home-empresa.component.css'
})
export class HomeEmpresaComponent implements OnInit {

  vacantes: Vacante[] = [];

  constructor(private vacantesService: VacantesService) {}

  ngOnInit(): void {
    this.vacantesService.getVacantesPorEmpresa().subscribe({
      next: (data) => {
       this.vacantes = data.vacantes;
    },
      error: (err) => console.error('Error al obtener las vacantes', err)
    });
  }
  



  eliminarVacante(idVacante: number) {
    const confirmacion = confirm('¿estas seguro de que quieres eliminar esta vacante?')

    if (confirmacion){
      this.vacantesService.CancelarVacante(idVacante).subscribe({
        next: (res) => {
          alert(res.mensaje);
          this.ngOnInit();
        },
        error: (err) => console.error('Error al eliminar la vacante', err)
      })
    }
  }




}
