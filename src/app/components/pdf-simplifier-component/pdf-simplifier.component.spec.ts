import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfSimplifierComponent } from './pdf-simplifier.component';

describe('PdfSimplifierComponent', () => {
  let component: PdfSimplifierComponent;
  let fixture: ComponentFixture<PdfSimplifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfSimplifierComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(PdfSimplifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no file selected initially', () => {
    expect(component.selectedFile).toBeNull();
  });
});
