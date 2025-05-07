import { Component, inject } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { ISolicitud } from '../../interfaces/isolicitud';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vacantes-cliente',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './vacantes-cliente.component.html',
  styleUrl: './vacantes-cliente.component.css'
})


export class VacantesClienteComponent {


solicitudes: ISolicitud[] = [];

//Inyectamos dependencias
private solicitudSer = inject(SolicitudService);
private router = inject(Router);

ngOnInit():void{

this.solicitudSer.getSolicitudesCliente().subscribe({
  next: (resp) => {
    this.solicitudes = resp.solicitudes;
    console.log("Solicitudes del usuario:", this.solicitudes);
  },
  error: (err) => {
    console.error("Error al cargar solicitudes", err);
  }
});
};


//metodo cancelar la solicitud
cancelarSolicitud(idSolicitud: number):void{
  if (confirm('¿Estás seguro de que deseas cancelar esta solicitud?')) {
    this.solicitudSer.deleteSolicitud(idSolicitud).subscribe({
      next: res => {
        alert(res.mensaje);
        this.router.navigate(['/home-cliente']);
      },
      error: err => {
        console.error('Error al cancelar solicitud', err);
        alert('Error al cancelar la solicitud');
      }
    });
  }
}



  }




