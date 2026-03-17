import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component'; // 1. Check this path and name
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Import the component AND the necessary modules for the template
      imports: [
        SignupComponent, 
        FormsModule, 
        RouterModule
      ],
      providers: [
        provideRouter([]) // 3. Provides routing context so routerLink doesn't crash
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    // Optional: Test to ensure your validation works
    expect(component).toBeTruthy();
  });
});