import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session, StudentSession } from '../models/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // Mock global sessions database
  private sessions: Session[] = [];

  // Mock global student participations
  private activeStudents: StudentSession[] = [];

  // Subjects for reactive updates
  private sessionsSubject = new BehaviorSubject<Session[]>(this.sessions);
  public sessions$ = this.sessionsSubject.asObservable();

  private activeStudentsSubject = new BehaviorSubject<StudentSession[]>(this.activeStudents);
  public activeStudents$ = this.activeStudentsSubject.asObservable();

  constructor(private authService: AuthService) {}

  // ---- ADMIN/GLOBAL METHODS ----
  getAllSessions(): Session[] {
    return this.sessions;
  }

  // ---- PROFESSOR METHODS ----
  getProfessorSessions(profId: string): Session[] {
    return this.sessions.filter(s => s.professorId === profId);
  }

  createSession(profId: string, profName: string, title: string, exercises: string[], language: string): Session {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newSession: Session = {
      id: 's_' + Date.now().toString(),
      code,
      professorId: profId,
      professorName: profName,
      title,
      exercises,
      language,
      isActive: true,
      createdAt: new Date()
    };
    this.sessions.push(newSession);
    this.sessionsSubject.next(this.sessions);
    return newSession;
  }

  getStudentsInSession(sessionId: string): StudentSession[] {
    return this.activeStudents.filter(ss => ss.sessionId === sessionId);
  }

  endSession(sessionId: string): void {
    const idx = this.sessions.findIndex(s => s.id === sessionId);
    if (idx > -1) {
      this.sessions[idx].isActive = false;
      this.sessionsSubject.next(this.sessions);
    }
  }

  // ---- STUDENT METHODS ----
  getSessionByCode(code: string): Session | undefined {
    return this.sessions.find(s => s.code.toUpperCase() === code.toUpperCase());
  }

  getSessionById(id: string): Session | undefined {
    return this.sessions.find(s => s.id === id);
  }

  joinSession(sessionId: string, studentId: string, studentName: string): StudentSession | undefined {
    const session = this.getSessionById(sessionId);
    if (!session) return undefined;

    // Check if already joined
    let studentSession = this.activeStudents.find(ss => ss.sessionId === sessionId && ss.studentId === studentId);
    if (!studentSession) {
      studentSession = {
        sessionId,
        studentId,
        studentName,
        currentCode: '',
        lastOutput: '',
        hasError: false,
        activeExerciseIndex: 0,
        exercisesData: session.exercises.map(() => ({ code: '', output: '', hasError: false })),
        isCompleted: false,
        joinedAt: new Date()
      };
      this.activeStudents.push(studentSession);
      this.activeStudentsSubject.next(this.activeStudents);
    }
    return studentSession;
  }

  private _initExercisesData(ss: StudentSession, sessionId: string) {
    const session = this.getSessionById(sessionId);
    if (session) {
       ss.exercisesData = session.exercises.map(() => ({ code: '', output: '', hasError: false }));
    }
  }

  updateStudentCode(sessionId: string, studentId: string, code: string, exerciseIndex?: number): void {
    const ss = this.activeStudents.find(s => s.sessionId === sessionId && s.studentId === studentId);
    if (ss) {
      ss.currentCode = code;
      if (exerciseIndex !== undefined) {
         if (!ss.exercisesData) this._initExercisesData(ss, sessionId);
         ss.activeExerciseIndex = exerciseIndex;
         if (ss.exercisesData && ss.exercisesData[exerciseIndex]) {
           ss.exercisesData[exerciseIndex].code = code;
         }
      }
      this.activeStudentsSubject.next(this.activeStudents); // trigger UI update for professor
    }
  }

  updateStudentExecution(sessionId: string, studentId: string, output: string, hasError: boolean, aiAnalysis?: string, exerciseIndex?: number): void {
    const ss = this.activeStudents.find(s => s.sessionId === sessionId && s.studentId === studentId);
    if (ss) {
      ss.lastOutput = output;
      ss.hasError = hasError;
      ss.lastErrorAnalysis = aiAnalysis;
      if (exerciseIndex !== undefined) {
         if (!ss.exercisesData) this._initExercisesData(ss, sessionId);
         ss.activeExerciseIndex = exerciseIndex;
         if (ss.exercisesData && ss.exercisesData[exerciseIndex]) {
           ss.exercisesData[exerciseIndex].output = output;
           ss.exercisesData[exerciseIndex].hasError = hasError;
           ss.exercisesData[exerciseIndex].lastErrorAnalysis = aiAnalysis;
         }
      }
      this.activeStudentsSubject.next(this.activeStudents);
    }
  }

  switchActiveExercise(sessionId: string, studentId: string, exerciseIndex: number): void {
    const ss = this.activeStudents.find(s => s.sessionId === sessionId && s.studentId === studentId);
    if (ss) {
      if (!ss.exercisesData) this._initExercisesData(ss, sessionId);
      ss.activeExerciseIndex = exerciseIndex;
      if (ss.exercisesData && ss.exercisesData[exerciseIndex]) {
        const data = ss.exercisesData[exerciseIndex];
        ss.currentCode = data.code;
        ss.lastOutput = data.output;
        ss.hasError = data.hasError;
        ss.lastErrorAnalysis = data.lastErrorAnalysis;
      }
      this.activeStudentsSubject.next(this.activeStudents);
    }
  }

  markStudentCompleted(sessionId: string, studentId: string): void {
    const ss = this.activeStudents.find(s => s.sessionId === sessionId && s.studentId === studentId);
    if (ss) {
      ss.isCompleted = true;
      this.activeStudentsSubject.next(this.activeStudents);
    }
  }
}
