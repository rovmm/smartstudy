import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../services/pdf.service';

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
  fileName = '';
  pageCount = 0;
  errorMessage = '';

  constructor(
    private pdfService: PdfService,
    private cdr: ChangeDetectorRef
  ) {}

  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragging = true; }
  onDragLeave(event: DragEvent) { event.preventDefault(); this.isDragging = false; }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) this.processFile(event.dataTransfer.files[0]);
  }
  onFileSelected(event: any) {
    if (event.target.files?.length) this.processFile(event.target.files[0]);
  }

  processFile(file: File) {
    this.isProcessing = true;
    this.showResult = false;
    this.errorMessage = '';
    this.summaryText = '';
    this.cdr.detectChanges();

    this.pdfService.summarizePdf(file).subscribe({
      next: (data: any) => {
        this.isProcessing = false;
        this.showResult = true;
        this.summaryText = data.summary;
        this.fileName = data.fileName;
        this.pageCount = data.pageCount;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isProcessing = false;
        this.errorMessage = err?.error?.message || 'Erreur.';
        this.cdr.detectChanges();
      }
    });
  }

  downloadSummary() {
    const blob = new Blob([this.summaryText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${this.fileName}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}