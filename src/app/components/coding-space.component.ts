import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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

  languages = ['javascript'];
  selectedLanguage = 'javascript';
  output: string = '';
  isError: boolean = false;
  isLoading: boolean = false;
  validationError: string = '';

  constructor(private CodeExecutionService: CodeExecutionService) {}

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
    const startCode = `// Write your JavaScript code here\nconsole.log("Hello, Coding Space!");`;
    const state = EditorState.create({
      doc: startCode,
      extensions: [basicSetup, javascript(), oneDark, EditorView.lineWrapping]
    });
    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement
    });
  }

  runCode(): void {
    const code = this.editorView.state.doc.toString().trim();
    if (!code) {
      this.validationError = 'Please write some code before running.';
      return;
    }

    this.isLoading = true;
    this.isError = false;
    this.output = '';

    this.codeExecutionService.executeCode({ code, language: this.selectedLanguage })
      .pipe(
        catchError(err => {
          return of({
            success: false,
            output: null,
            error: err?.message || 'Server error'
          } as CodeResponse);
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(res => {
        if (res.success) {
          this.output = res.output || 'Success (no output)';
          this.isError = false;
        } else {
          this.output = res.error || 'Unknown error';
          this.isError = true;
        }
      });
  }
}