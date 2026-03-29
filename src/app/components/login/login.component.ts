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

    constructor(
        private fb: FormBuilder, 
        private authService: AuthService, 
        private router: Router
    ) {
        // Initialisation du formulaire avec les validations
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    // Accès facile aux contrôles du formulaire dans le HTML
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.errorMessage = ''; 

        // 1. Vérification de la validité
        if (this.loginForm.invalid) {
            console.log("Formulaire invalide");
            return;
        }

        // --- SIMULATION DE CONNEXION ---
        console.log("Connexion en cours...");
        
        // Stockage du token
        localStorage.setItem('accessToken', 'fake-token-123');

        // Redirection vers le chemin parent + enfant
        // C'est ici que l'erreur de "refresh" (redirection vers **) se produisait
        this.router.navigate(['/app/pdf-simplifier']);
    }
}