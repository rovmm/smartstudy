export type Role = 'admin' | 'professor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinedAt: Date;
}

export interface Session {
  id: string;
  code: string;
  professorId: string;
  professorName: string;
  title: string;
  exercises: string[];
  language: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ExerciseState {
  code: string;
  output: string;
  hasError: boolean;
  lastErrorAnalysis?: string;
}

export interface StudentSession {
  sessionId: string;
  studentId: string;
  studentName: string;
  currentCode: string;
  lastOutput: string;
  hasError: boolean;
  lastErrorAnalysis?: string;
  activeExerciseIndex?: number;
  exercisesData?: ExerciseState[];
  isCompleted: boolean;
  joinedAt: Date;
}
