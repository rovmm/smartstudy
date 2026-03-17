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

        this.authService.login(this.loginForm.value).subscribe({
            next: (data: any) => { // : any corrige l'erreur sur data
                console.log('Connexion réussie !', data);
                
                // On enregistre le token (assurez-vous que le backend renvoie accessToken)
                if (data && data.accessToken) {
                    this.authService.saveToken(data.accessToken);
                }
                
                this.router.navigate(['/home']); 
            },
            error: (err: any) => { // : any corrige l'erreur sur err
                console.error('Erreur de connexion', err);
                this.errorMessage = "Email ou mot de passe incorrect.";
            }
        });
    }
}