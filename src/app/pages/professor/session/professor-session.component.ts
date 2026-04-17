import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { Session, StudentSession } from '../../../models/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-professor-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professor-session.component.html',
  styleUrls: ['./professor-session.component.css']
})
export class ProfessorSessionComponent implements OnInit, OnDestroy {
  session: Session | undefined;
  students: StudentSession[] = [];
  selectedStudent: StudentSession | undefined;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.session = this.sessionService.getSessionById(id);
      if (this.session) {
        this.sub = this.sessionService.activeStudents$.subscribe(() => {
          this.students = this.sessionService.getStudentsInSession(id);
          if (this.selectedStudent) {
            this.selectedStudent = this.students.find(s => s.studentId === this.selectedStudent!.studentId);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  selectStudent(student: StudentSession): void {
    this.selectedStudent = student;
  }

  endSession(): void {
    if (this.session && confirm('Are you sure you want to end this session? Students will no longer be able to submit.')) {
      this.sessionService.endSession(this.session.id);
    }
  }

  goBack(): void {
    this.router.navigate(['/professor/dashboard']);
  }
}