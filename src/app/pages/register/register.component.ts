import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registroForm!: FormGroup;
mensajeError: string = '';

private url: string = 'http://localhost:9008';

private http = inject(HttpClient)
private router = inject(Router)
authser = inject(AuthService)
private fb = inject(FormBuilder);


constructor() {}

ngOnInit(): void {
  this.registroForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
}



  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.mensajeError = 'Completa todos los campos correctamente.';
      return;
    }


    const datos = this.registroForm.value;

    this.authser.registro(datos).subscribe({
      next:() => {
        this.router.navigate(['/login']);
      }
    });

}


}
