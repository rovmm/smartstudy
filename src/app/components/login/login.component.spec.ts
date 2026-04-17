import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importez les modules nécessaires et le composant Standalone
      imports: [LoginComponent, RouterTestingModule, FormsModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    // Vérification de l'état initial défini dans le .ts (showPassword = false)
    expect(component.showPassword).toBe(false);

    // On appelle le nom EXACT de la méthode définie dans votre .ts
    component.togglePasswordVisibility();

    // Vérification que c'est passé à true
    expect(component.showPassword).toBe(true);

    // On rappelle pour vérifier que ça revient à false
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });
});