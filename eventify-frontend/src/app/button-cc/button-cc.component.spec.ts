import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCcComponent } from './button-cc.component';

describe('ButtonCcComponent', () => {
  let component: ButtonCcComponent;
  let fixture: ComponentFixture<ButtonCcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCcComponent]
    });
    fixture = TestBed.createComponent(ButtonCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
