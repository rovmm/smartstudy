import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component'; 
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Pour un composant Standalone, on l'ajoute dans imports
      imports: [NavbarComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme', () => {
    // 1. Vérifie l'état initial (doit être true selon ton composant)
    expect(component.isDarkMode).toBe(true);
    
    // 2. Exécute le basculement
    component.toggleTheme();
    
    // 3. Vérifie que c'est bien passé à false
    expect(component.isDarkMode).toBe(false);
    
    // 4. Teste le retour à true pour être complet
    component.toggleTheme();
    expect(component.isDarkMode).toBe(true);
  });
});