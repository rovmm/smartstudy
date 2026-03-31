import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CodingSpaceComponent } from './coding-space.component'; // Ensure name is correct
import { CodeExecutionService } from '../services/CodeExecutionService';

describe('CodingSpaceComponent', () => {
  let component: CodingSpaceComponent;
  let fixture: ComponentFixture<CodingSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // We import the component and the Testing version of HttpClient
      imports: [CodingSpaceComponent, HttpClientTestingModule],
      providers: [CodeExecutionService]
    }).compileComponents();

    fixture = TestBed.createComponent(CodingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});