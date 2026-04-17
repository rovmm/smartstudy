import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../../services/session.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  // Mock des services
  const authMock = {
    getAllUsers: () => [{ id: '1', name: 'Test User', email: 'test@test.com', role: 'admin' }],
    deleteUser: jasmine.createSpy('deleteUser')
  };
  const sessionMock = {
    getAllSessions: () => []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: SessionService, useValue: sessionMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    component.ngOnInit();
    expect(component.users.length).toBeGreaterThan(0);
  });

  it('should return correct role colors', () => {
    expect(component.getRoleColor('admin')).toBe('#ef4444');
    expect(component.getRoleColor('student')).toBe('#3b82f6');
  });
});