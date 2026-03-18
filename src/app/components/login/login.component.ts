import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    submitted = false;
    errorMessage = '';
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.errorMessage = '';

        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;

        this.authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                this.isLoading = false;
                console.log('Connexion réussie !', data);

                if (data && data.token) {        // ← "token" pas "accessToken" !
                    this.authService.saveToken(data.token);
                    localStorage.setItem('user', JSON.stringify(data));
                }

                this.router.navigate(['/home']);
            },
            error: (err: any) => {
                this.isLoading = false;
                console.error('Erreur de connexion', err);
                this.errorMessage = "Email ou mot de passe incorrect.";
            }
        });
    }
}