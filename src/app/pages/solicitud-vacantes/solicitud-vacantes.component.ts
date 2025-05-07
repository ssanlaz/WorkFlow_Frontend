import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { VacantesService } from '../../services/vacantes.service';



@Component({
  selector: 'app-solicitud-vacantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-vacantes.component.html',
  styleUrl: './solicitud-vacantes.component.css'
})
export class SolicitudVacantesComponent implements OnInit{


  solicitudes: any[] = [];
  formularioVisible             = false;
  solicitudSelecionada: any     = null;


  constructor(
    private solicitudesService: SolicitudService,
   private vacantesSer : VacantesService,
  ){}


  ngOnInit(): void {
    // Obtener solicitudes filtradas por el usuario logueado
    this.solicitudesService.getSolicitudesPorUsuario().subscribe({
      next: (data: any[]) => {
        this.solicitudes = data;
    },
      error: (err: any) => {
        console.error('Error al obtener solicitudes', err);
      }
    });
  }



    aceptarSolicitud(solicitud: any) : void {
      this.vacantesSer.AsignarVacante(solicitud.vacante.idVacante, solicitud.usuario.email)
      .subscribe({
        next: (res: any) => {
          alert(res.mensaje || 'Vacante asignada correctamente');
          solicitud.estado = true; 
        },
        error: (err) => {
          console.error('Error al asignar vacante', err);
          alert('Error al asignar vacante');
        }
      });
      
    }
}
