import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingSpace } from './coding-space';

describe('CodingSpace', () => {
  let component: CodingSpace;
  let fixture: ComponentFixture<CodingSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodingSpace],
    }).compileComponents();

    fixture = TestBed.createComponent(CodingSpace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
