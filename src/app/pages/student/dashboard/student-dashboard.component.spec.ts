import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentDashboardComponent } from './student-dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../services/session.service';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest'; // Import indispensable

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;

  // Correction 1 : Utilisation de vi.fn() au lieu de jasmine.createSpy
  const sessionServiceMock = {
    getSessionByCode: vi.fn(),
    joinSession: vi.fn()
  };

  const authServiceMock = {
    currentUser: { id: 'std123', name: 'Student Test' },
    // Ajoute ceci si ton composant s'abonne à currentUser$ (vu dans tes fichiers précédents)
    currentUser$: of({ id: 'std123', name: 'Student Test' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboardComponent, RouterTestingModule, FormsModule],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for invalid session code', () => {
    // Correction 2 : vi.mockReturnValue au lieu de .and.returnValue
    sessionServiceMock.getSessionByCode.mockReturnValue(null);
    
    component.sessionCode = 'INVALID';
    component.joinSession();
    
    expect(component.errorMessage).toBe('Invalid session code. Please try again.');
  });

  it('should show error if session has ended', () => {
    // Correction 3 : Simuler une session inactive
    sessionServiceMock.getSessionByCode.mockReturnValue({ id: 's1', isActive: false });
    
    component.sessionCode = 'ENDED1';
    component.joinSession();
    
    expect(component.errorMessage).toBe('This session has ended.');
  });
});