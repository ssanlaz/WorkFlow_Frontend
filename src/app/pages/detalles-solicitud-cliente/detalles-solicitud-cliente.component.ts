
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ISolicitud } from '../../interfaces/isolicitud';
import { SolicitudService } from '../../services/solicitud.service';


@Component({
  selector: 'app-detalles-solicitud-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalles-solicitud-cliente.component.html',
  styleUrl: './detalles-solicitud-cliente.component.css'
})
export class DetallesSolicitudClienteComponent implements OnInit{

  solicitud!: ISolicitud;
  private solicitudSer = inject(SolicitudService);
  private route = inject(ActivatedRoute);
  
  
  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('idSolicitud'));
  
    if (!id || isNaN(id)) {
      console.error('ID de solicitud inválido');
      return;
    }
  
    this.solicitudSer.verDetallesSolicitud(id).subscribe({
      next: (resp) => {
        this.solicitud = resp.solicitud;
      },
      error: (err) => {
        console.error('Error al cargar detalles de la solicitud', err);
      }
    });
  }
  
  
  
  }
  
  
  
  