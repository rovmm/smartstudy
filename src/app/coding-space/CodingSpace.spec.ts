import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CodingSpaceComponent } from './coding-space'; // Vérifie bien que le fichier source est dans le même dossier

describe('CodingSpaceComponent', () => {
  let component: CodingSpaceComponent;
  let fixture: ComponentFixture<CodingSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // On importe le composant ET le module HTTP pour le service
      imports: [CodingSpaceComponent, HttpClientModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(CodingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});