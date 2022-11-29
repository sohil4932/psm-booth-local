import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiyamsPreviewComponent } from './niyams-preview.component';

describe('NiyamsPreviewComponent', () => {
  let component: NiyamsPreviewComponent;
  let fixture: ComponentFixture<NiyamsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiyamsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiyamsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
