import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessorDashboardComponent } from './professor-dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfessorDashboardComponent', () => {
  let component: ProfessorDashboardComponent;
  let fixture: ComponentFixture<ProfessorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfessorDashboardComponent, 
        FormsModule, 
        RouterTestingModule,
        HttpClientTestingModule
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
    component.addExercise();
    component.removeExercise(0);
    expect(component.newSessionPrompts.length).toBe(1);
  });

  it('should validate empty prompts correctly', () => {
    component.newSessionTitle = 'Test Session';
    component.newSessionPrompts = [''];
    expect(component.isInvalidPrompts()).toBe(true);
    
    component.newSessionPrompts = ['Valid Exercise'];
    expect(component.isInvalidPrompts()).toBe(false);
  });
});