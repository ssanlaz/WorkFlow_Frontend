import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alta-admin.component.html',
  styleUrl: './alta-admin.component.css'
})
export class AltaAdminComponent {



  formulario!: FormGroup;
  modoVisualizacion: boolean = false;

  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router)
  route  = inject(ActivatedRoute)


  emailAdmin: string | null = null;
idAdmin: number | null = null;
  
  ngOnInit(): void {

    const path = this.router.url;
    this.modoVisualizacion = path.includes('/detallesAdmin');

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.modoVisualizacion) {
      this.formulario.get('password')?.clearValidators();
      this.formulario.get('password')?.updateValueAndValidity();
    }

    this.route.paramMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.emailAdmin = email;
        this.userService.getAdminByEmail(email).subscribe({
          next: (admin) => {
            console.log('Admin cargado:', admin);
      
            this.formulario.patchValue({
              nombre: admin.nombre,
              apellidos: admin.apellidos,
              email: admin.email
            });
            if (this.modoVisualizacion) {
              this.formulario.disable();
            }
            this.formulario.get('password')?.setValidators([]);
          },
          error: err => {
            console.error('Error al cargar administrador', err);
            alert('No se pudo cargar el administrador');
          }
        });
      }
    });

  }


registrarAdmin(): void {

  if (this.formulario.invalid) return;
  const datos = this.formulario.value;

if(this.emailAdmin){
  this.userService.updateAdmin(this.emailAdmin, datos).subscribe({
    next: () => {
      alert("Administrador actualizado correctamente");
      this.router.navigate(['/administradores']);
    },
    error: (err) => {
      console.error(err);
      alert(err.error?.mensaje || 'Error al actualizar administrador');
    }
  });
} else {
  this.userService.createAdmin(datos).subscribe({
    next: (res) => {
      alert("Administrador registrado correctamente");
      this.router.navigate(['/administradores']);
    },
    error: (err) => {
      console.error(err);
      alert(err.error?.mensaje || 'Error al registrar administrador');
    }
  });
}


}

}