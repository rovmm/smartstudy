import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';

import { CodeExecutionService, CodeResponse } from '../services/CodeExecutionService';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-coding-space',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './coding-space.html',
  styleUrls: ['./coding-space.css']
})
export class CodingSpaceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('editorContainer') editorContainer!: ElementRef;
  private editorView!: EditorView;

  languages = ['javascript', 'python', 'cpp', 'java'];
  selectedLanguage = 'javascript';
  output: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  validationError: string = '';

  // --- DICTIONNAIRE DES CODES PAR DÉFAUT ---
  defaultCodes: { [key: string]: string } = {
    javascript: '// Write your JavaScript code here\nconsole.log("Hello, Coding Space!");',
    python: '# Write your Python code here\nprint("Hello, Coding Space!")',
    cpp: '// Write your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, Coding Space!" << std::endl;\n    return 0;\n}',
    java: '// Write your Java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Coding Space!");\n    }\n}'
  };

  constructor(private codeExecutionService: CodeExecutionService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    if (this.editorView) {
      this.editorView.destroy();
    }
  }

  private initializeEditor(): void {
    // On utilise le code par défaut initial (JS)
    const startCode = this.defaultCodes['javascript'];

    const state = EditorState.create({
      doc: startCode,
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        EditorView.lineWrapping,
      ]
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement
    });
  }

  private getLanguageExtension(lang: string) {
    switch (lang) {
      case 'python': return python();
      case 'cpp': return cpp();
      case 'java': return java();
      default: return javascript();
    }
  }

  // --- MODIFICATION ICI : CHANGE LE TEXTE ET LA COLORATION ---
  onLanguageChange(): void {
    if (this.editorView) {
      // On récupère le template correspondant au nouveau langage
      const newCode = this.defaultCodes[this.selectedLanguage] || '';
      
      const state = EditorState.create({
        doc: newCode, // Injection du nouveau texte
        extensions: [
          basicSetup,
          this.getLanguageExtension(this.selectedLanguage),
          oneDark,
          EditorView.lineWrapping,
        ]
      });
      this.editorView.setState(state);
    }
  }

  private getEditorCode(): string {
    return this.editorView.state.doc.toString();
  }

  runCode(): void {
    const code = this.getEditorCode().trim();
    this.validationError = '';
    this.output = '';

    if (!code) {
      this.validationError = 'Please write some code before running.';
      return;
    }

    this.isLoading = true;
    this.isError = false;

    const request = {
      code,
      language: this.selectedLanguage
    };

    this.codeExecutionService.executeCode(request)
      .pipe(
        catchError(err => {
          const errorResponse: CodeResponse = {
            success: false,
            output: null,
            error: err?.error?.error || err?.message || 'Network error. Is the backend running?'
          };
          return of(errorResponse);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response: CodeResponse) => {
        if (response.success) {
          this.output = response.output ?? 'Code executed successfully.';
          this.isError = false;
        } else {
          this.output = response.error ?? 'An unknown error occurred.';
          this.isError = true;
        }
      });
  }

  clearOutput(): void {
    this.output = '';
    this.isError = false;
    this.validationError = '';
  }
}