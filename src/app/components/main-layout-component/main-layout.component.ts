import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  // Données fictives pour le profil utilisateur
  userName: string = 'Smart Student';
  userEmail: string = 'student@smartstudy.com';

  constructor(private router: Router) {}

  logout() {
    console.log('User logged out');

    // 1. Nettoyer les données de session (très important)
    localStorage.removeItem('accessToken');

    // 2. Rediriger vers la page d'accueil (Login/Signup)
    // Selon tes routes, c'est soit '/' soit '/login'
    this.router.navigate(['/']); 
  }
}