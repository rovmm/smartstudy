import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentSessionComponent } from './student-session.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentSessionComponent', () => {
  let component: StudentSessionComponent;
  let fixture: ComponentFixture<StudentSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentSessionComponent,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});