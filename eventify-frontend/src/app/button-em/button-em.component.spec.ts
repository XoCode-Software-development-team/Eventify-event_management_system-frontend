import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEmComponent } from './button-em.component';

describe('ButtonEmComponent', () => {
  let component: ButtonEmComponent;
  let fixture: ComponentFixture<ButtonEmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonEmComponent]
    });
    fixture = TestBed.createComponent(ButtonEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
