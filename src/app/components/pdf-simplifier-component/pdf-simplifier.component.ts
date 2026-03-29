import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-simplifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-simplifier.component.html',
  styleUrl: './pdf-simplifier.component.css'
})
export class PdfSimplifierComponent {
  isDragging = false;
  isProcessing = false;
  showResult = false;
  summaryText = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.processFile(event.target.files[0]);
    }
  }

  processFile(file: File) {
    this.isProcessing = true;
    this.showResult = false;
    
    // Simulate 3 seconds upload and OCR parsing
    setTimeout(() => {
      this.isProcessing = false;
      this.showResult = true;
      this.summaryText = "This document presents an overview of core programming concepts, focusing heavily on application architecture and database modeling. Key takeaways:\\n\\n1. Monolithic vs Microservices: Microservices provide higher scalability and independent deployments, whereas monolithic architectures are easier to develop and test initially.\\n2. Database Indexing: Critical for optimizing query performance but introduces overhead on write operations.\\n3. Asynchronous Programming: Vital for maintaining responsive user interfaces by preventing main-thread blocking.\\n\\nConclusion: Designing robust systems requires balancing simplicity, performance, and long-term maintainability.";
    }, 3000);
  }

  generateQuiz() {
    console.log('Generate Quiz clicked');
  }

  downloadSummary() {
    console.log('Download Summary clicked');
  }
}
