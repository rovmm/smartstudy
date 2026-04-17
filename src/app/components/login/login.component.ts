import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.email && this.password) {
      // In a real app, this would validate credentials via backend
      console.log('Login attempt', { email: this.email });
      alert('This is a demo. Please use the "Fast Demo Login" buttons below to test roles.');
    }
  }

  // Demo features for quick role testing
  demoLogin(role: string): void {
    let userId = '';
    if (role === 'admin') userId = 'u_admin1';
    if (role === 'professor') userId = 'u_prof1';
    if (role === 'student') userId = 'u_stud1';

    if (this.authService.loginAs(userId)) {
      this.router.navigate([`/${role}/dashboard`]);
    } else {
      this.loginError = true;
    }
  }
}
