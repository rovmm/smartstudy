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

import { CodeExecutionService, CodeResponse } from '../services/CodeExecutionService';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * CodingSpaceComponent — main editor component.
 * Hosts the CodeMirror editor, language selector, run button, and output panel.
 */
@Component({
  selector: 'app-coding-space',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './coding-space.html',
  styleUrls: ['./coding-space.css']
})
export class CodingSpaceComponent name {
  constructor(parameters) {
    
  }
} implements OnInit, AfterViewInit, OnDestroy {

  // Reference to the DOM element where CodeMirror will mount
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  // CodeMirror EditorView instance
  private editorView!: EditorView;

  // Available languages for the dropdown
  languages = ['javascript'];

  // Currently selected language
  selectedLanguage = 'javascript';

  // Output panel state
  output: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  // Validation message
  validationError: string = '';

  constructor(private codeExecutionService: CodeExecutionService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize CodeMirror editor after the view is ready
    this.initializeEditor();
  }

  ngOnDestroy(): void {
    // Clean up the editor when the component is destroyed
    if (this.editorView) {
      this.editorView.destroy();
    }
  }

  /**
   * Initializes the CodeMirror 6 editor with JavaScript support and dark theme.
   */
  private initializeEditor(): void {
    const startCode = `// Write your JavaScript code here\nconsole.log("Hello, Coding Space!");`;

    const state = EditorState.create({
      doc: startCode,
      extensions: [
        basicSetup,                 // Line numbers, bracket matching, etc.
        javascript(),               // JavaScript syntax highlighting
        oneDark,                    // Dark theme
        EditorView.lineWrapping,    // Wrap long lines
      ]
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement
    });
  }

  /**
   * Gets the current code from the CodeMirror editor.
   */
  private getEditorCode(): string {
    return this.editorView.state.doc.toString();
  }

  /**
   * Called when the user clicks "Run Code".
   * Validates input, calls the backend, and displays the result.
   */
  runCode(): void {
    const code = this.getEditorCode().trim();
    this.validationError = '';
    this.output = '';

    // Basic client-side validation
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
        // Handle HTTP-level errors (network issues, 5xx, etc.)
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

  /**
   * Clears the output panel.
   */
  clearOutput(): void {
    this.output = '';
    this.isError = false;
    this.validationError = '';
  }
}