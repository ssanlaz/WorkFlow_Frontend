import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Vacante } from '../../interfaces/vacante';
import { VacantesService } from '../../services/vacantes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-vacantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-vacantes.component.html',
  styleUrl: './detalles-vacantes.component.css'
})
export class DetallesVacantesComponent {

  vacante!: Vacante;

  private vacantesSer = inject(VacantesService);
  private route = inject(ActivatedRoute);


  ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('idVacante');
    if (id) {
      this.vacantesSer.getVacanteById(+id).subscribe({
        next: (data) => this.vacante = data,
        error: (err) => console.error('Error al cargar detalle:', err)
      });
    }
  }
  
}
