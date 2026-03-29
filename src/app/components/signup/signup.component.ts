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
  isLoading = false;

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

  get f() { return this.signupForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;

    const { firstName, lastName, email, password } = this.signupForm.value;

    // ← Combine firstName + lastName en fullName
    const payload = {
      fullName: `${firstName} ${lastName}`,
      email: email,
      password: password
    };

    this.authService.register(payload).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        console.log("Inscription réussie !", response);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error("Erreur lors de l'inscription", err);
        this.errorMessage = "Une erreur est survenue lors de l'inscription.";
      }
    });
  }
}