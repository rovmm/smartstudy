import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  languages = [
    { id: 'python', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { id: 'javascript', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { id: 'java', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { id: 'cpp', name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { id: 'html', name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { id: 'css', name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { id: 'php', name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' }
  ];

  levels = [
    { id: 'beginner', name: 'Beginner', icon: 'school', color: '#10b981' },
    { id: 'intermediate', name: 'Intermediate', icon: 'psychology', color: '#f59e0b' },
    { id: 'advanced', name: 'Advanced', icon: 'military_tech', color: '#ef4444' }
  ];

  selectedLanguage = '';
  selectedLevel = '';
  quizStarted = false;
  quizFinished = false;
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  answered = false;
  score = 0;
  questions: Question[] = [];

  private questionBank: { [key: string]: { [key: string]: Question[] } } = {
    python: {
      beginner: [
        { question: 'What is the correct way to create a variable in Python?', options: ['var x = 5', 'x = 5', 'int x = 5', 'let x = 5'], correct: 1 },
        { question: 'Which function is used to output text in Python?', options: ['echo()', 'console.log()', 'print()', 'printf()'], correct: 2 },
        { question: 'What is Python\'s conditional keyword?', options: ['switch', 'if', 'when', 'case'], correct: 1 },
        { question: 'How do you create a list in Python?', options: ['list = (1,2,3)', 'list = [1,2,3]', 'list = {1,2,3}', 'list = <1,2,3>'], correct: 1 },
        { question: 'Which of these is a comment in Python?', options: ['// comment', '/* comment */', '# comment', '-- comment'], correct: 2 }
      ],
      intermediate: [
        { question: 'What does "self" refer to in a Python class?', options: ['The class itself', 'The parent class', 'The current instance', 'A global variable'], correct: 2 },
        { question: 'What is a list comprehension?', options: ['A way to sort lists', 'A concise way to create lists', 'A method to delete lists', 'A way to merge lists'], correct: 1 },
        { question: 'What does the "yield" keyword do?', options: ['Stops the function', 'Returns and pauses a generator', 'Throws an error', 'Creates a loop'], correct: 1 },
        { question: 'What is a decorator in Python?', options: ['A design pattern', 'A function that modifies another function', 'A class method', 'A type hint'], correct: 1 },
        { question: 'What does *args do in a function definition?', options: ['Unpacks a dictionary', 'Allows variable number of arguments', 'Creates a pointer', 'Multiplies arguments'], correct: 1 }
      ],
      advanced: [
        { question: 'What is the GIL in Python?', options: ['Global Integer Lock', 'Global Interpreter Lock', 'General Input Layer', 'Garbage Initialization Lock'], correct: 1 },
        { question: 'What is a metaclass?', options: ['A class decorator', 'A class that creates classes', 'An abstract class', 'A mixin'], correct: 1 },
        { question: 'What does __slots__ do?', options: ['Limits attribute creation', 'Creates time slots', 'Defines slots in routing', 'Nothing'], correct: 0 },
        { question: 'What is the purpose of __new__?', options: ['Initialize instance', 'Create new instance', 'Delete instance', 'Copy instance'], correct: 1 },
        { question: 'What is a coroutine in Python?', options: ['A type of list', 'A concurrent routine using async/await', 'A built-in module', 'A testing framework'], correct: 1 }
      ]
    },
    javascript: {
      beginner: [
        { question: 'Which keyword declares a constant in JavaScript?', options: ['var', 'let', 'const', 'static'], correct: 2 },
        { question: 'What does DOM stand for?', options: ['Document Object Model', 'Data Object Model', 'Digital Output Mode', 'Direct Object Mapping'], correct: 0 },
        { question: 'How do you log output in JavaScript?', options: ['print()', 'echo()', 'console.log()', 'System.out.println()'], correct: 2 },
        { question: 'Which is NOT a JavaScript data type?', options: ['string', 'boolean', 'float', 'undefined'], correct: 2 },
        { question: 'What does === check?', options: ['Value only', 'Type only', 'Value and type', 'Reference'], correct: 2 }
      ],
      intermediate: [
        { question: 'What is a closure in JavaScript?', options: ['A loop construct', 'A function with access to outer scope', 'A class method', 'An error handler'], correct: 1 },
        { question: 'What does Promise.all() do?', options: ['Runs promises sequentially', 'Waits for all promises to resolve', 'Cancels all promises', 'Creates new promises'], correct: 1 },
        { question: 'What is event delegation?', options: ['Creating custom events', 'Handling events on parent elements', 'Delegating work to workers', 'Async event handling'], correct: 1 },
        { question: 'What is the spread operator?', options: ['...', '**', '&&', '||'], correct: 0 },
        { question: 'What is destructuring?', options: ['Deleting objects', 'Unpacking values from arrays/objects', 'Breaking code', 'Minifying code'], correct: 1 }
      ],
      advanced: [
        { question: 'What is the event loop?', options: ['A for loop for events', 'Mechanism handling async operations', 'DOM traversal', 'CSS animation loop'], correct: 1 },
        { question: 'What is a WeakMap?', options: ['An immutable Map', 'A Map with weakly held keys', 'A smaller Map', 'A Map without values'], correct: 1 },
        { question: 'What is tree shaking?', options: ['DOM manipulation', 'Dead code elimination', 'Random shuffling', 'Memory cleanup'], correct: 1 },
        { question: 'What is a Proxy object used for?', options: ['Network requests', 'Intercepting object operations', 'CSS animations', 'File handling'], correct: 1 },
        { question: 'What is Symbol used for?', options: ['Math operations', 'Unique property keys', 'String encoding', 'Error codes'], correct: 1 }
      ]
    },
    java: {
      beginner: [
        { question: 'Which is the entry point of a Java program?', options: ['start()', 'main()', 'init()', 'run()'], correct: 1 },
        { question: 'What is Java\'s parent class of all classes?', options: ['Base', 'Root', 'Object', 'Super'], correct: 2 },
        { question: 'Which keyword creates a new instance?', options: ['create', 'new', 'init', 'make'], correct: 1 },
        { question: 'What type holds decimal numbers?', options: ['int', 'char', 'double', 'boolean'], correct: 2 },
        { question: 'How do you print in Java?', options: ['print()', 'console.log()', 'System.out.println()', 'echo()'], correct: 2 }
      ],
      intermediate: [
        { question: 'What is polymorphism?', options: ['Multiple constructors', 'One interface, many forms', 'Multiple inheritance', 'Static typing'], correct: 1 },
        { question: 'What is an interface in Java?', options: ['A class', 'A contract for classes', 'A variable type', 'A package'], correct: 1 },
        { question: 'What does "final" mean for a class?', options: ['Last in package', 'Cannot be inherited', 'Has no methods', 'Is abstract'], correct: 1 },
        { question: 'What is autoboxing?', options: ['Automatic packaging', 'Primitive to wrapper conversion', 'Code compilation', 'Garbage collection'], correct: 1 },
        { question: 'Which collection maintains insertion order?', options: ['HashSet', 'TreeSet', 'LinkedHashSet', 'HashMap'], correct: 2 }
      ],
      advanced: [
        { question: 'What is the JIT compiler?', options: ['Just-In-Time compiler', 'Java Internal Translator', 'Java Instruction Tool', 'Just-In-Testing'], correct: 0 },
        { question: 'What are generics used for?', options: ['Generic methods', 'Type-safe collections', 'Abstract classes', 'Annotations'], correct: 1 },
        { question: 'What is a volatile variable?', options: ['A fast variable', 'Visible to all threads', 'An encrypted variable', 'A temporary variable'], correct: 1 },
        { question: 'What is reflection?', options: ['Mirror pattern', 'Runtime class inspection', 'Error handling', 'Dependency injection'], correct: 1 },
        { question: 'What does the transient keyword do?', options: ['Makes field fast', 'Excludes from serialization', 'Makes field public', 'Locks the field'], correct: 1 }
      ]
    },
    cpp: {
      beginner: [
        { question: 'What is C++ an extension of?', options: ['Java', 'C', 'Python', 'Assembly'], correct: 1 },
        { question: 'Which symbol is used for output in C++?', options: ['>>', '<<', '->', '=>'], correct: 1 },
        { question: 'What is the correct include for I/O?', options: ['#include <stdio.h>', '#include <iostream>', '#include <io>', '#include <system>'], correct: 1 },
        { question: 'How do you declare a pointer?', options: ['int& p', 'int* p', 'int p*', 'ptr int p'], correct: 1 },
        { question: 'Which keyword creates a constant?', options: ['static', 'final', 'const', 'immutable'], correct: 2 }
      ],
      intermediate: [
        { question: 'What is a virtual function?', options: ['An inline function', 'A function for polymorphism', 'A static function', 'A template function'], correct: 1 },
        { question: 'What is RAII?', options: ['Resource Acquisition Is Initialization', 'Runtime Analysis', 'Reference And Iteration', 'Register Allocation'], correct: 0 },
        { question: 'What does std::move do?', options: ['Copies an object', 'Transfers ownership', 'Deletes an object', 'Creates a reference'], correct: 1 },
        { question: 'What is a smart pointer?', options: ['A fast pointer', 'Auto memory-managed pointer', 'A function pointer', 'A void pointer'], correct: 1 },
        { question: 'What is operator overloading?', options: ['Using multiple operators', 'Redefining operator behavior', 'Operator precedence', 'Type casting'], correct: 1 }
      ],
      advanced: [
        { question: 'What is SFINAE?', options: ['Substitution Failure Is Not An Error', 'Static Function Interface', 'Standard Formatting', 'Sequential Iteration'], correct: 0 },
        { question: 'What are variadic templates?', options: ['Variable templates', 'Templates with variable args', 'Dynamic templates', 'Runtime templates'], correct: 1 },
        { question: 'What is std::optional?', options: ['An optional import', 'A wrapper for optional values', 'A conditional compile', 'A null pointer'], correct: 1 },
        { question: 'What is the rule of five?', options: ['Five design patterns', 'Five special member functions', 'Five compilation steps', 'Five data types'], correct: 1 },
        { question: 'What is constexpr?', options: ['Constant expression evaluated at compile time', 'A pointer type', 'An exception handler', 'A thread type'], correct: 0 }
      ]
    },
    html: {
      beginner: [
        { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer ML', 'Home Tool ML'], correct: 0 },
        { question: 'Which tag creates a paragraph?', options: ['<para>', '<p>', '<text>', '<pg>'], correct: 1 },
        { question: 'Which tag creates a link?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
        { question: 'Which is a self-closing tag?', options: ['<div>', '<p>', '<img>', '<span>'], correct: 2 },
        { question: 'Which tag creates the largest heading?', options: ['<h6>', '<h1>', '<heading>', '<head>'], correct: 1 }
      ],
      intermediate: [
        { question: 'What is semantic HTML?', options: ['Colored HTML', 'Meaningful element names', 'Encrypted HTML', 'Dynamic HTML'], correct: 1 },
        { question: 'Which is a semantic element?', options: ['<div>', '<span>', '<article>', '<b>'], correct: 2 },
        { question: 'What does the "alt" attribute do on images?', options: ['Adds animation', 'Provides alternative text', 'Changes alignment', 'Sets opacity'], correct: 1 },
        { question: 'Which input type creates a date picker?', options: ['text', 'calendar', 'date', 'datetime'], correct: 2 },
        { question: 'What is the purpose of the <meta> tag?', options: ['Display text', 'Provide metadata', 'Create links', 'Style elements'], correct: 1 }
      ],
      advanced: [
        { question: 'What is the purpose of ARIA attributes?', options: ['Styling', 'Accessibility', 'Performance', 'Security'], correct: 1 },
        { question: 'What is the Shadow DOM?', options: ['Dark mode', 'Encapsulated DOM tree', 'Hidden elements', 'Server rendering'], correct: 1 },
        { question: 'What is a Web Component?', options: ['A CSS framework', 'Reusable custom elements', 'A JavaScript library', 'A build tool'], correct: 1 },
        { question: 'What does the Content Security Policy header do?', options: ['Caches content', 'Prevents XSS attacks', 'Compresses HTML', 'Validates forms'], correct: 1 },
        { question: 'What is the <template> tag used for?', options: ['Email templates', 'Holding client-side content', 'Server templates', 'CSS templates'], correct: 1 }
      ]
    },
    css: {
      beginner: [
        { question: 'What does CSS stand for?', options: ['Creative Style System', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'], correct: 1 },
        { question: 'Which property changes text color?', options: ['text-color', 'font-color', 'color', 'text-style'], correct: 2 },
        { question: 'Which property sets background color?', options: ['bg-color', 'background-color', 'color-bg', 'back-color'], correct: 1 },
        { question: 'How do you select an element by ID?', options: ['.id', '#id', '*id', '@id'], correct: 1 },
        { question: 'Which property makes text bold?', options: ['font-style', 'text-decoration', 'font-weight', 'font-bold'], correct: 2 }
      ],
      intermediate: [
        { question: 'What is Flexbox used for?', options: ['3D layouts', '1D layouts', 'Animations', 'Typography'], correct: 1 },
        { question: 'What is CSS Grid used for?', options: ['Animations', 'Typography', '2D layouts', 'Colors'], correct: 2 },
        { question: 'What does "z-index" control?', options: ['Zoom level', 'Stacking order', 'Font size', 'Rotation'], correct: 1 },
        { question: 'What is a CSS pseudo-class?', options: ['A fake class', 'A state-based selector', 'An animation class', 'A media query'], correct: 1 },
        { question: 'What does "box-sizing: border-box" do?', options: ['Adds borders', 'Includes padding in width', 'Removes margins', 'Centers elements'], correct: 1 }
      ],
      advanced: [
        { question: 'What is CSS Custom Properties?', options: ['Built-in colors', 'CSS Variables (--var)', 'Preset animations', 'Default styles'], correct: 1 },
        { question: 'What is the CSS cascade?', options: ['A waterfall effect', 'Priority rules for styles', 'Animation timing', 'Grid system'], correct: 1 },
        { question: 'What is CSS containment?', options: ['Restricting overflow', 'Isolating layout/paint/style', 'Container queries', 'Encapsulation'], correct: 1 },
        { question: 'What is @layer in CSS?', options: ['Z-index control', 'Cascade layer ordering', 'Media queries', 'Font loading'], correct: 1 },
        { question: 'What are CSS Houdini APIs?', options: ['Animation library', 'Low-level CSS engine access', 'Build tools', 'Testing framework'], correct: 1 }
      ]
    },
    php: {
      beginner: [
        { question: 'What does PHP stand for?', options: ['Personal Home Page', 'PHP: Hypertext Preprocessor', 'Pre Hyper Processor', 'Public Host Platform'], correct: 1 },
        { question: 'How do you start a PHP block?', options: ['<php>', '<?php', '<script php>', '<%php'], correct: 1 },
        { question: 'Which symbol starts a variable in PHP?', options: ['@', '#', '$', '&'], correct: 2 },
        { question: 'How do you print output?', options: ['print()', 'echo', 'Both A and B', 'console.log()'], correct: 2 },
        { question: 'What is the concatenation operator?', options: ['+', '&', '.', '~'], correct: 2 }
      ],
      intermediate: [
        { question: 'What is a PHP namespace?', options: ['A file system', 'Organized code grouping', 'A database', 'A web server'], correct: 1 },
        { question: 'What does PDO stand for?', options: ['PHP Data Objects', 'Personal Database ORM', 'PHP Dynamic Output', 'Processing Data Online'], correct: 0 },
        { question: 'What is a trait in PHP?', options: ['A data type', 'Reusable method set', 'An interface', 'A constant'], correct: 1 },
        { question: 'What is Composer?', options: ['A text editor', 'PHP dependency manager', 'A web server', 'A testing tool'], correct: 1 },
        { question: 'What does the => operator do in arrays?', options: ['Comparison', 'Key-value association', 'Type casting', 'Arrow function'], correct: 1 }
      ],
      advanced: [
        { question: 'What are PHP Fibers?', options: ['File handlers', 'Lightweight concurrency', 'Template engine', 'ORM feature'], correct: 1 },
        { question: 'What is the Opcache?', options: ['A database cache', 'Compiled bytecode cache', 'HTTP cache', 'Session cache'], correct: 1 },
        { question: 'What are PHP attributes (8.0)?', options: ['HTML attributes', 'Structured metadata', 'CSS properties', 'JS attributes'], correct: 1 },
        { question: 'What is a Generator in PHP?', options: ['Code generator', 'Lazy iteration with yield', 'Random number tool', 'Class factory'], correct: 1 },
        { question: 'What is the null coalescing operator?', options: ['?:', '??', '!?', '?.'], correct: 1 }
      ]
    }
  };

  startQuiz(): void {
    if (!this.selectedLanguage || !this.selectedLevel) return;
    this.questions = this.questionBank[this.selectedLanguage]?.[this.selectedLevel] || [];
    if (this.questions.length === 0) return;
    this.quizStarted = true;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.answered = false;
  }

  selectAnswer(index: number): void {
    if (this.answered) return;
    this.selectedAnswer = index;
    this.answered = true;
    if (index === this.questions[this.currentQuestionIndex].correct) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.answered = false;
    } else {
      this.quizFinished = true;
    }
  }

  restartQuiz(): void {
    this.quizStarted = false;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.answered = false;
  }

  getScoreMessage(): string {
    const pct = (this.score / this.questions.length) * 100;
    if (pct === 100) return '🏆 Perfect Score! Incredible!';
    if (pct >= 80) return '🌟 Excellent! Great job!';
    if (pct >= 60) return '👍 Good work! Keep practicing!';
    if (pct >= 40) return '📚 Not bad, room to improve!';
    return "💪 Keep learning, you'll get there!";
  }

  getScoreColor(): string {
    const pct = (this.score / this.questions.length) * 100;
    if (pct >= 80) return '#10b981';
    if (pct >= 60) return '#f59e0b';
    return '#ef4444';
  }
}
