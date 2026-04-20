import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessorDashboardComponent } from './professor-dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { of } from 'rxjs';

describe('ProfessorDashboardComponent', () => {
  let component: ProfessorDashboardComponent;
  let fixture: ComponentFixture<ProfessorDashboardComponent>;

  beforeEach(async () => {
    // Mock basique pour les services requis par le composant
    const authServiceMock = {
      currentUserValue: { id: 'prof1', name: 'Professor', role: 'professor' },
      currentUser$: of({ id: 'prof1', name: 'Professor', role: 'professor' })
    };

    const sessionServiceMock = {
      sessions$: of([]),
      getProfessorSessions: () => []
    };

    await TestBed.configureTestingModule({
      imports: [
        ProfessorDashboardComponent, 
        FormsModule, 
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with one empty exercise prompt', () => {
    expect(component.newSessionPrompts.length).toBe(1);
    expect(component.newSessionPrompts[0]).toBe('');
  });

  it('should add an exercise prompt when addExercise is called', () => {
    component.addExercise();
    expect(component.newSessionPrompts.length).toBe(2);
  });

  it('should remove an exercise prompt when removeExercise is called', () => {
    component.addExercise(); // passe à 2
    component.removeExercise(0); // revient à 1
    expect(component.newSessionPrompts.length).toBe(1);
  });

  it('should validate empty prompts correctly', () => {
    component.newSessionTitle = 'Test Session';
    component.newSessionPrompts = [''];
    expect(component.isInvalidPrompts()).toBe(true);
    
    component.newSessionPrompts = ['Valid Exercise'];
    expect(component.isInvalidPrompts()).toBe(false);
  });

  // NOUVEAU TEST : Duplication
  it('should fill form data when duplicateSession is called', () => {
    const mockSession: any = {
      id: '123',
      title: 'Original Session',
      exercises: ['Ex 1', 'Ex 2'],
      code: 'ABCD',
      professorId: 'prof1',
      professorName: 'Professor',
      language: 'javascript',
      isActive: true
    };

    component.duplicateSession(mockSession);

    expect(component.newSessionTitle).toBe('Original Session (Copy)');
    expect(component.newSessionPrompts.length).toBe(2);
    expect(component.newSessionPrompts).toEqual(['Ex 1', 'Ex 2']);
  });
});