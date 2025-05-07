import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;

  //Validar formulario
  constructor(
    private fb:       FormBuilder,
    private router:   Router,
    private authSer : AuthService)
    {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  //Metodo del login
  onLogin() {


    if(this.loginForm.invalid) return;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

    this.authSer.login(email,password).subscribe({
        next: (res: any) => {

          const rol = res.rol?.toLowerCase().trim();

          this.authSer.setAuthEstado(true,rol)



      // Redirigir según el rol

        switch (rol) {
          case 'cliente':
            console.log("Redirigiendo a /home-cliente");
            this.router.navigate(['/home-cliente']);
            break;
          case 'empresa':
            this.router.navigate(['/home-empresa']);
            break;
          case 'admon':
            this.router.navigate(['/home-admin']);
            break;
          default:
            alert('Rol no reconocido');
            break;
        }
      } ,

      });

    }

  }

}
