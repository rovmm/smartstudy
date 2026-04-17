import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { FormsModule } from '@angular/forms'; // Importé ici pour le test

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Si QuizComponent est standalone, on l'ajoute dans imports
      // On ajoute aussi FormsModule pour que ngModel fonctionne dans les tests
      imports: [QuizComponent, FormsModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 languages', () => {
    expect(component.languages.length).toBe(7);
  });

  it('should have 3 levels', () => {
    expect(component.levels.length).toBe(3);
  });

  it('should not start quiz without selections', () => {
    // On s'assure que les sélections sont vides
    component.selectedLanguage = '';
    component.selectedLevel = '';
    
    component.startQuiz();
    
    // Utilisation de toBe(false) qui est plus universel que toBeFalse()
    expect(component.quizStarted).toBe(false);
  });
});