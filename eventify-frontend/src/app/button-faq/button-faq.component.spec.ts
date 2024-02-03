import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFaqComponent } from './button-faq.component';

describe('ButtonFaqComponent', () => {
  let component: ButtonFaqComponent;
  let fixture: ComponentFixture<ButtonFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonFaqComponent]
    });
    fixture = TestBed.createComponent(ButtonFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
