import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacante } from '../../interfaces/vacante';
import { SolicitudService } from '../../services/solicitud.service';
import { AuthService } from '../../services/auth.service';
import { VacantesService } from '../../services/vacantes.service';

@Component({
  selector: 'app-solicitud-vacante-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud-vacante-cliente.component.html',
  styleUrl: './solicitud-vacante-cliente.component.css'
})
export class SolicitudVacanteClienteComponent {

  //Cremos objeto
  solicitud = {
    fecha: '',
    comentarios: '',
    archivo: '',
    estado: false,
    curriculum: '',
    idVacante: 0,
    emailUsuario:''
  };



  archivoSeleccionado: File | null = null;
  vacante!: Vacante;


  //Inyectamos
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private solicitudSer = inject(SolicitudService);
  private authService = inject(AuthService);
  private vacanSer = inject(VacantesService);

  //SACAR LA VACANTE POR SU ID Y MANDAR LA SOLICTUD
  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('idVacante');
    console.log('ID capturado:', idString);

    const id = Number(idString);
    if (!id || isNaN(id)) {
      console.error('ID inválido:', id);
      return;
    }

    this.solicitud.idVacante = id;

    this.solicitud.emailUsuario = this.authService.getEmail();

    this.vacanSer.getVacanteById(id).subscribe({
      next: (resp : any) => {
        console.log('RESPUESTA COMPLETA:', resp);
        this.vacante = resp;
        console.log("Vacante cargada:", this.vacante);
      },
      error : err => console.error("Error al obtener la vacante",err)
    });

  }

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
    if (this.archivoSeleccionado) {
      const nombreArchivo = this.archivoSeleccionado.name;

      this.solicitud.archivo = nombreArchivo;
      this.solicitud.curriculum = 'CV adjunto';
    }
  }

  //ENVIAR SOLICITUD DE LA VACANTE
  enviar(): void {
  // Formatear fecha como 'YYYY-MM-DD'
  this.solicitud.fecha = new Date().toISOString().split('T')[0];

  this.solicitudSer.enviarSolicitud(this.solicitud).subscribe({
    next: res => {
      alert('Solicitud enviada con éxito');
     this.router.navigate(['/vacantes']);
    },
    error: err => alert('Error al enviar solicitud')
    });
  }
}
