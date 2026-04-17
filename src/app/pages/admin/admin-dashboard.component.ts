import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { User, Session } from '../../models/types';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  sessions: Session[] = [];

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.users = this.authService.getAllUsers();
    this.sessions = this.sessionService.getAllSessions();
  }

  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin': return '#ef4444';
      case 'professor': return '#f59e0b';
      default: return '#3b82f6';
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId);
      this.loadData();
    }
  }
}