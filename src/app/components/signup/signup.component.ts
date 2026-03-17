import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  // Getter pour faciliter l'accès aux contrôles dans le HTML
  get f() { return this.signupForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      return;
    }

    // On envoie les données au service
    this.authService.login(this.signupForm.value).subscribe({
      next: (response: any) => {
        console.log("Inscription réussie !", response);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error("Erreur lors de l'inscription", err);
        this.errorMessage = "Une erreur est survenue lors de l'inscription.";
      }
    });
  }
}