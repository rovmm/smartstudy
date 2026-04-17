import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { CodeExecutionService } from '../../../services/code-execution.service';
import { AuthService } from '../../../services/auth.service';
import { Session, StudentSession } from '../../../models/types';

// Informe TypeScript que CodeMirror est chargé via index.html (CDN)
declare var CodeMirror: any;

@Component({
  selector: 'app-student-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-session.component.html',
  styleUrls: ['./student-session.component.css']
})
export class StudentSessionComponent implements OnInit, AfterViewInit, OnDestroy {
  session: Session | undefined;
  studentData: StudentSession | undefined;
  
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  private editorInstance: any;

  currentCode: string = '';
  output: string = '';
  isRunning: boolean = false;
  activeExerciseIndex: number = 0;

  private editorOptions: any = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    readOnly: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService,
    private codeExec: CodeExecutionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const user = this.authService.currentUserValue;
    
    if (id && user && user.role === 'student') {
      this.session = this.sessionService.getSessionById(id);
      if (this.session) {
        this.studentData = this.sessionService.getStudentsInSession(id).find(s => s.studentId === user.id);
        if (this.studentData) {
          this.output = this.studentData.lastOutput;
          this.activeExerciseIndex = this.studentData.activeExerciseIndex || 0;
        }

        this.currentCode = this.studentData?.currentCode || `// Solution for ${this.session.title}\n\n`;
        this.editorOptions = {
          ...this.editorOptions,
          mode: this.getMode(this.session.language),
          readOnly: !this.session.isActive ? 'nocursor' : false
        };
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngAfterViewInit(): void {
    // Utilisation d'un délai pour s'assurer que les scripts CDN sont prêts
    setTimeout(() => {
      if (this.session && this.editorContainer?.nativeElement && typeof CodeMirror !== 'undefined') {
        this.editorInstance = CodeMirror(this.editorContainer.nativeElement, {
          ...this.editorOptions,
          value: this.currentCode
        });

        this.editorInstance.on('change', () => {
          this.currentCode = this.editorInstance.getValue();
          this.onCodeChange(this.currentCode);
        });
        
        this.editorInstance.refresh();
      }
    }, 150);
  }

  private getMode(lang: string | undefined): string {
    const map: any = { html: 'xml', cpp: 'text/x-c++src', java: 'text/x-java' };
    return map[lang || ''] || lang || 'javascript';
  }

  onCodeChange(newCode: string): void {
    if (this.session && this.studentData) {
      this.sessionService.updateStudentCode(this.session.id, this.studentData.studentId, newCode, this.activeExerciseIndex);
    }
  }

  selectExercise(index: number): void {
    if (this.activeExerciseIndex === index) return;
    this.activeExerciseIndex = index;
    if (this.session && this.studentData) {
      this.sessionService.switchActiveExercise(this.session.id, this.studentData.studentId, index);
      const updatedData = this.sessionService.getStudentsInSession(this.session.id).find(s => s.studentId === this.studentData!.studentId);
      if (updatedData) {
        this.studentData = updatedData;
        this.currentCode = updatedData.currentCode || '';
        this.output = updatedData.lastOutput || '';
        if (this.editorInstance) {
          this.editorInstance.setValue(this.currentCode);
          setTimeout(() => this.editorInstance.refresh(), 10);
        }
      }
    }
  }

  async executeCode(): Promise<void> {
    if (!this.session || !this.studentData || this.isRunning) return;
    this.isRunning = true;
    if (this.editorInstance) {
      this.currentCode = this.editorInstance.getValue();
    }
    
    try {
      const result = await this.codeExec.mockExecuteCode(this.session.language, this.currentCode);
      this.output = result.output;
      let aiAnalysis = result.hasError ? await this.codeExec.getAiErrorAnalysis(this.currentCode, result.output) : undefined;
      this.sessionService.updateStudentExecution(this.session.id, this.studentData.studentId, result.output, result.hasError, aiAnalysis, this.activeExerciseIndex);
    } catch (e: any) {
      this.output = 'System error executing code.';
    } finally {
      this.isRunning = false;
    }
  }

  getExtension(lang: string | undefined): string {
    const map: any = { javascript: 'js', python: 'py', html: 'html', css: 'css', java: 'java', cpp: 'cpp', php: 'php' };
    return map[lang || ''] || 'txt';
  }

  leaveSession(): void { this.router.navigate(['/student/dashboard']); }
  ngOnDestroy(): void { if(this.editorInstance) this.editorInstance = null; }
}