import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule], // Suppression de CodemirrorModule ici
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css'
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  // On utilise un ElementRef pour injecter l'éditeur directement
  @ViewChild('editorHost') editorHost!: ElementRef;
  
  private editorView?: EditorView;
  private languageConf = new Compartment();

  languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { id: 'python', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { id: 'html', name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { id: 'css', name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { id: 'java', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { id: 'cpp', name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { id: 'php', name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' }
  ];

  selectedLanguage = 'javascript';
  dropdownOpen = false;
  output = '';
  showOutput = false;
  isRunning = false;
  
  private defaultCode = `// Welcome to SmartStudy Code Editor!\n// JavaScript Sandbox\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log("Fibonacci sequence:");\nfor (let i = 0; i < 10; i++) {\n  console.log('  fib(' + i + ') = ' + fibonacci(i));\n}`;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCodeMirror();
  }

  ngOnDestroy(): void {
    this.editorView?.destroy();
  }

  private initCodeMirror(): void {
    const startState = EditorState.create({
      doc: this.defaultCode,
      extensions: [
        basicSetup,
        this.languageConf.of(javascript()),
        EditorView.theme({
          "&": { height: "100%", fontSize: "14px" },
          ".cm-scroller": { overflow: "auto" },
          "&.cm-focused": { outline: "none" }
        }, { dark: true }),
        // Détecte les changements pour mettre à jour la variable locale (si besoin)
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            // Optionnel : tu peux récupérer le code ici
          }
        })
      ]
    });

    this.editorView = new EditorView({
      state: startState,
      parent: this.editorHost.nativeElement
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  selectLanguage(lang: any): void {
    this.selectedLanguage = lang.id;
    this.dropdownOpen = false;
    
    // Changement dynamique du langage avec CM6
    let extension;
    switch (lang.id) {
      case 'python': extension = python(); break;
      case 'html': extension = html(); break;
      case 'css': extension = css(); break;
      case 'java': extension = java(); break;
      case 'cpp': extension = cpp(); break;
      case 'php': extension = php(); break;
      default: extension = javascript();
    }

    this.editorView?.dispatch({
      effects: this.languageConf.reconfigure(extension)
    });
  }

  runCode(): void {
    this.isRunning = true;
    this.showOutput = true;
    
    // Récupérer le code actuel de l'éditeur CM6
    const executionCode = this.editorView?.state.doc.toString() || '';

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args: any[]) => {
          logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
        };
        
        new Function(executionCode)();
        
        console.log = originalLog;
        this.output = logs.join('\n') || 'Code executed successfully (no output)';
      } catch (e: any) {
        this.output = '❌ Error: ' + e.message;
      }
      this.isRunning = false;
    }, 800);
  }

  clearOutput(): void {
    this.output = '';
    this.showOutput = false;
  }
}