import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHComponent } from './button-h.component';

describe('ButtonHComponent', () => {
  let component: ButtonHComponent;
  let fixture: ComponentFixture<ButtonHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonHComponent]
    });
    fixture = TestBed.createComponent(ButtonHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
