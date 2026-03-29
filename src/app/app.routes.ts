import { Routes } from '@angular/router';

// 1. Public Pages (Full Screen)
import { HomeComponent } from './pages/home/home.component';        // <-- Your code above
import { LoginComponent } from './components/login/login.component';     // <-- From my last message
import { SignupComponent } from './components/signup/signup.component';  // <-- From my last message

// 2. Private Dashboard Layout (SideBar + Content)
import { MainLayoutComponent } from './components/main-layout-component/main-layout.component';
import { Dashboard } from './components/dashboard/dashboard.component';
import { PdfSimplifierComponent } from './components/pdf-simplifier-component/pdf-simplifier.component';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
  // ===================================
  // PUBLIC ROUTES
  // ===================================
  // This makes your Home Page show up FIRST! (when url is empty)
  { path: '', component: HomeComponent },
  
  // These are your standalone auth pages
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // ===================================
  // PRIVATE ROUTES (Inside the Sidebar)
  // ===================================
  {
    path: 'app',
    component: MainLayoutComponent, // This wrapper has the Sidebar
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pdf-simplifier', component: PdfSimplifierComponent },
      { path: 'quiz', component: QuizComponent },
      
      // Default fallback inside the app
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback for any incorrect URL (redirect to Home page)
  { path: '**', redirectTo: '' }
];
