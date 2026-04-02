import { Routes } from '@angular/router';

// 1. Pages Publiques (Plein écran)
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CodingSpaceComponent } from './coding-space/coding-space';

// 2. Dashboard Privé (Sidebar + Contenu)
import { MainLayoutComponent } from './components/main-layout-component/main-layout.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { PdfSimplifierComponent } from './components/pdf-simplifier-component/pdf-simplifier.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  // ===================================
  // ROUTES PUBLIQUES
  // ===================================
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // ===================================
  // ROUTES PRIVÉES (À l'intérieur de la Sidebar)
  // ===================================
  {
    path: 'app',
    component: MainLayoutComponent, // Ce composant contient ta Sidebar
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pdf-simplifier', component: PdfSimplifierComponent },
      { path: 'quiz', component: QuizComponent },
      
      // AJOUT ICI : La route pour ton espace de code
      { path: 'coding-space', component: CodingSpaceComponent },
      
      // Redirection par défaut à l'intérieur de l'app
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Redirection en cas d'URL incorrecte
  { path: '**', redirectTo: '' }
];