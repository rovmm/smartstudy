import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CodeEditorComponent } from './components/code-editor-component/code-editor.component';
import { PdfSimplifierComponent } from './components/pdf-simplifier-component/pdf-simplifier.component';
import { QuizComponent } from './components/quiz/quiz.component';

// Admin
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';
// Professor
import { ProfessorDashboardComponent } from './pages/professor/dashboard/professor-dashboard.component';
import { ProfessorSessionComponent } from './pages/professor/session/professor-session.component';
// Student
import { StudentDashboardComponent } from './pages/student/dashboard/student-dashboard.component';
import { StudentSessionComponent } from './pages/student/session/student-session.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'code-editor', component: CodeEditorComponent }, // standalone/anonymous mode
  { path: 'pdf-simplifier', component: PdfSimplifierComponent },
  { path: 'quiz', component: QuizComponent },
  
  // Role specific routes
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  
  { path: 'professor/dashboard', component: ProfessorDashboardComponent },
  { path: 'professor/session/:id', component: ProfessorSessionComponent },
  
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'student/session/:id', component: StudentSessionComponent },
  
  { path: '**', redirectTo: '' }
];
