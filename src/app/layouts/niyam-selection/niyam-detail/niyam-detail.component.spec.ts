import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiyamDetailComponent } from './niyam-detail.component';

describe('NiyamDetailComponent', () => {
  let component: NiyamDetailComponent;
  let fixture: ComponentFixture<NiyamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiyamDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NiyamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
