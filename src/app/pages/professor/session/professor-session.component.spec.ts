import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessorSessionComponent } from './professor-session.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfessorSessionComponent', () => {
  let component: ProfessorSessionComponent;
  let fixture: ComponentFixture<ProfessorSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorSessionComponent, RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessorSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});