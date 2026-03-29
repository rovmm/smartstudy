import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  languages = ['Python', 'JavaScript', 'HTML/CSS', 'Java', 'C++', 'PHP'];
  
  selectedLanguage: string = '';
  selectedLevel: string = '';
  
  isProcessing = false;
  showQuiz = false;

  mockQuestions = [
    { question: "What is the primary use of this language?", options: ["Web Dev", "Game Dev", "AI/ML", "OS"], answer: "AI/ML" },
    { question: "Which symbol defines a variable?", options: ["var", "let", "def", "$"], answer: "let" }
  ];

  generateQuiz() {
    if (!this.selectedLanguage || !this.selectedLevel) return;
    
    this.isProcessing = true;
    this.showQuiz = false;

    // Simulate AI generation time (3s)
    setTimeout(() => {
      this.isProcessing = false;
      this.showQuiz = true;
    }, 3000);
  }
}
