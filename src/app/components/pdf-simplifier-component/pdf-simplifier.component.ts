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
  selectedFile: File | null = null;
  isProcessing = false;
  summary = '';
  fileName = '';
  isDragging = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && files[0].type === 'application/pdf') {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    this.selectedFile = file;
    this.fileName = file.name;
    this.summary = '';
  }

  async processFile(): Promise<void> {
    if (!this.selectedFile) return;

    this.isProcessing = true;
    this.summary = '';

    try {
      // Use pdfjs-dist to extract text
      const arrayBuffer = await this.selectedFile.arrayBuffer();
      const pdfjsLib = await import('pdfjs-dist');

      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n--- Page ${i} ---\n${pageText}`;
      }

      if (fullText.trim()) {
        // Generate a simplified summary
        const sentences = fullText
          .replace(/\s+/g, ' ')
          .split(/[.!?]+/)
          .map(s => s.trim())
          .filter(s => s.length > 30);

        const keyPoints = sentences.slice(0, 15);

        this.summary = `📄 Document: ${this.fileName}\n` +
          `📊 Pages analyzed: ${Math.min(pdf.numPages, 20)} of ${pdf.numPages}\n` +
          `📝 Total content extracted: ${fullText.length} characters\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `📌 KEY POINTS SUMMARY:\n\n` +
          keyPoints.map((point, i) => `${i + 1}. ${point}.`).join('\n\n') +
          (pdf.numPages > 20 ? `\n\n⚠️ Note: Only the first 20 pages were analyzed.` : '');
      } else {
        this.summary = '⚠️ Could not extract text from this PDF. The file may contain scanned images instead of text.';
      }
    } catch (error: any) {
      this.summary = '❌ Error processing PDF: ' + error.message;
    }

    this.isProcessing = false;
  }

  clearFile(): void {
    this.selectedFile = null;
    this.fileName = '';
    this.summary = '';
  }
}
