import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySpace } from './study-space';

describe('StudySpace', () => {
  let component: StudySpace;
  let fixture: ComponentFixture<StudySpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySpace],
    }).compileComponents();

    fixture = TestBed.createComponent(StudySpace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
