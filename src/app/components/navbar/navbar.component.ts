import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isLoggedIn = false;
  userRole: string | null = '';
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });
    this.authService.getIsAuthenticated().subscribe(auth => {
      this.isLoggedIn = auth;
    });
  }





  logout() {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/home']);
      });
      
  }


  }    


