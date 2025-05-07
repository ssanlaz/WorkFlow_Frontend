import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Empresa } from '../../interfaces/empresa';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil-empresa.component.html',
  styleUrl: './perfil-empresa.component.css'
})
export class PerfilEmpresaComponent implements OnInit{


  rol : string | null = null;

  empresa!: Empresa;
 
 

  constructor(
    private route: ActivatedRoute,
    private authService:    AuthService,
    private empresaService: EmpresaService
  ){}

  ngOnInit(): void {

    this.authService.getUserRole().subscribe(rol => {
      this.rol = rol;
    })
    const idParam = this.route.snapshot.paramMap.get('idEmpresa');
    const idEmpresa = idParam ? +idParam : null;

    if (idEmpresa) {
      // Si venimos desde el boton ver detalles del ADMON
      this.empresaService.getEmpresaById(idEmpresa).subscribe({
        next: (empresa) => {
          this.empresa = empresa;
        },
        error: (err) => console.error('Error al obtener empresa por ID', err)
      });
    } else {
      const email = this.authService.getEmail();
      console.log('Email recuperado:', email);
    this.empresaService.getEmpresas().subscribe({
      next: (empresas) => {
        const encontrada = empresas.find((e: Empresa) => e.email === email);
        if (encontrada) {
          this.empresa = encontrada;
        } else {
          console.error('Empresa no encontrada para el email:', email);
        }
      },
      error: (err) => console.error('Error al obtener empresas', err)
    });
  }
}
    

}







