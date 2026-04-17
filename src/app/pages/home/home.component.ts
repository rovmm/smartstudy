import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: 'code',
      title: 'Code Editor',
      description: 'Write & run code in Python, JavaScript, Java, C++, and more with our powerful CodeMirror-based editor.',
      link: '/code-editor',
      color: '#6366f1'
    },
    {
      icon: 'picture_as_pdf',
      title: 'PDF Simplifier',
      description: 'Upload any PDF and get an instant simplified summary. Perfect for studying complex documents.',
      link: '/pdf-simplifier',
      color: '#06b6d4'
    },
    {
      icon: 'quiz',
      title: 'Interactive Quiz',
      description: 'Test your knowledge with quizzes for multiple languages and difficulty levels from beginner to advanced.',
      link: '/quiz',
      color: '#8b5cf6'
    }
  ];

  languages = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776ab' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#f7df1e' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', color: '#ed8b00' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', color: '#00599c' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', color: '#e34f26' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', color: '#1572b6' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', color: '#777bb4' }
  ];

  stats = [
    { value: '7+', label: 'Languages' },
    { value: '100+', label: 'Quiz Questions' },
    { value: 'AI', label: 'PDF Analysis' },
    { value: '∞', label: 'Practice' }
  ];
}
