import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { Session } from '../../../models/types';

@Component({
  selector: 'app-professor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent implements OnInit {
  mySessions: Session[] = [];
  
  newSessionTitle = '';
  newSessionPrompts: string[] = [''];

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Utilisation de currentUserValue au lieu de currentUser
    const user = this.authService.currentUserValue;
    
    if (user && user.role === 'professor') {
      this.mySessions = this.sessionService.getProfessorSessions(user.id);
      
      // On s'abonne aux changements de sessions pour mettre à jour la liste
      this.sessionService.sessions$.subscribe(() => {
        if (user) {
          this.mySessions = this.sessionService.getProfessorSessions(user.id);
        }
      });
    } else {
      
      this.router.navigate(['/login']);
    }
  }

  addExercise(): void {
    this.newSessionPrompts.push('');
  }

  removeExercise(index: number): void {
    if (this.newSessionPrompts.length > 1) {
      this.newSessionPrompts.splice(index, 1);
    } else {
      this.newSessionPrompts[0] = '';
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  isInvalidPrompts(): boolean {
    return this.newSessionPrompts.length === 0 || this.newSessionPrompts.some(p => !p || !p.trim());
  }

  onCreateSession(): void {
    const user = this.authService.currentUserValue;
    if (user && this.newSessionTitle && !this.isInvalidPrompts()) {
      const session = this.sessionService.createSession(
        user.id,
        user.name,
        this.newSessionTitle,
        this.newSessionPrompts,
        'javascript'
      );
      this.router.navigate(['/professor/session', session.id]);
    }
  }

  viewSession(sessionId: string): void {
    this.router.navigate(['/professor/session', sessionId]);
  }
}