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

        // On utilise la VRAIE méthode de ton binôme qui appelle le backend
        this.authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                this.isLoading = false;
                console.log('Connexion réussie !', data);

                // On utilise la méthode saveToken de ton binôme pour être cohérent
                if (data && data.token) {
                    this.authService.saveToken(data.token);
                    // On stocke l'utilisateur si besoin
                    localStorage.setItem('user', JSON.stringify(data));
                    
                    // REDIRECTION : On va vers ton nouveau dashboard après succès
                    this.router.navigate(['/app/dashboard']); 
                }
            },
            error: (err: any) => {
                this.isLoading = false;
                console.error('Erreur de connexion', err);
                this.errorMessage = "Email ou mot de passe incorrect.";
            }
        });
    }
}