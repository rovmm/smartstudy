import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
// Corrected paths below:
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },         // Page d'accueil
  { path: 'signup', component: SignupComponent }, // Inscription
  { path: 'login', component: LoginComponent },   // Connexion
];