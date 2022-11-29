import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiyamSelectionComponent } from './niyam-selection.component';

describe('NiyamSelectionComponent', () => {
  let component: NiyamSelectionComponent;
  let fixture: ComponentFixture<NiyamSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiyamSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiyamSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
