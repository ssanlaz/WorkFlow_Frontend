import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Iusuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  usuarios: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res.usuarios;
    },
    error: (err) => {
      console.error(err);
      alert('Error al cargar los usuarios');
    }
  });
}





  eliminarUsuario(email: string): void {
    if (confirm('¿Estás seguro de que deseas dar de baja este usuario?')) {
      this.userService.deleteUsuario(email).subscribe({
        next: () => {
          alert('Usuario eliminado con éxito');
          this.ngOnInit(); // Recargar lista
        },
        error: (err) => {
          console.error('Error al eliminar usuario', err);
          alert('Error al eliminar usuario');
        }
      });
    }
  }

}
