import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { User } from '../../../models/types';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  sessionCode = '';
  errorMessage = '';
  private currentUser: User | null = null; // Stockage local de l'utilisateur

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On s'abonne pour garder une référence à l'utilisateur actuel
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  joinSession(): void {
    this.errorMessage = '';
    
    if (!this.sessionCode.trim()) {
      this.errorMessage = 'Please enter a session code.';
      return;
    }

    const session = this.sessionService.getSessionByCode(this.sessionCode);
    
    if (session) {
      if (!session.isActive) {
        this.errorMessage = 'This session has ended.';
        return;
      }
      
      // On utilise l'utilisateur stocké via le ngOnInit
      if (!this.currentUser) {
        this.errorMessage = 'You must be logged in to join.';
        return;
      }

      const ss = this.sessionService.joinSession(session.id, this.currentUser.id, this.currentUser.name);
      
      if (ss) {
        this.router.navigate(['/student/session', session.id]);
      } else {
        this.errorMessage = 'Failed to join session.';
      }
    } else {
      this.errorMessage = 'Invalid session code. Please try again.';
    }
  }
}