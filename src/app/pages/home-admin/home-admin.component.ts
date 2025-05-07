import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})


export class HomeAdminComponent {


  administradores: any[] = [];

  private userSer = inject(UserService);

  ngOnInit(): void{
    this.userSer.getAdmin().subscribe({
      next: (data) => this.administradores = data.admins,
      error: (err) => console.error("Error al cargar administradores",err)
    });
  }





  eliminarAdmin(email: string) : void {
    if (confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
   this.userSer.deleteAdmin(email).subscribe({
    next: () => {
      alert('Administrador eliminado con éxito');
      // Refrescar la lista
      this.userSer.getAdmin().subscribe({
        next: (data) => this.administradores = data.admins
      });
      },
      error: (err) => {
        console.error('Error al eliminar administrador', err);
        alert('Error al eliminar administrador');
        }
      });
      }
      }





}
