import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrMapComponent } from './pr-map.component';

describe('PrMapComponent', () => {
  let component: PrMapComponent;
  let fixture: ComponentFixture<PrMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
