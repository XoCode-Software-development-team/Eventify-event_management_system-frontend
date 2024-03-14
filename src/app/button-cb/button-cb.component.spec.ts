import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCbComponent } from './button-cb.component';

describe('ButtonCbComponent', () => {
  let component: ButtonCbComponent;
  let fixture: ComponentFixture<ButtonCbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCbComponent]
    });
    fixture = TestBed.createComponent(ButtonCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
