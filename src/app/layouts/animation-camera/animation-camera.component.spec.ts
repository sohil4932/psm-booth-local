import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationCameraComponent } from './animation-camera.component';

describe('AnimationCameraComponent', () => {
  let component: AnimationCameraComponent;
  let fixture: ComponentFixture<AnimationCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
