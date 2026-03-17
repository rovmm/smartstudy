import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    languages = [
        { name: 'Python', icon: '🐍', color: '#3776AB', description: 'Data science & AI' },
        { name: 'HTML', icon: '🌐', color: '#E34F26', description: 'Web structure' },
        { name: 'CSS', icon: '🎨', color: '#1572B6', description: 'Web styling' },
        { name: 'C++', icon: '⚙️', color: '#00599C', description: 'Game dev & systems' },
        { name: 'C', icon: '🖥️', color: '#A8B9CC', description: 'Low-level programming' },
        { name: 'Java', icon: '☕', color: '#007396', description: 'Enterprise & Android' },
        { name: 'JavaScript', icon: '⚡', color: '#F7DF1E', description: 'Interactive web' },
        { name: 'PHP', icon: '🐘', color: '#777BB4', description: 'Server-side web' }
    ];

    aiFeatures = [
        {
            title: 'Course Summarizer AI',
            icon: '🧠',
            description: 'Stuck on a long lecture? Our AI instantly resumes and summarizes courses to highlight key takeaways so you can learn faster.'
        },
        {
            title: 'PDF Simplifier',
            icon: '📄',
            description: 'Upload dense academic materials. Our AI extracts core concepts and simplifies complex jargon into easy-to-digest study notes.'
        }
    ];
}
