import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGsComponent } from './button-gs.component';

describe('ButtonGsComponent', () => {
  let component: ButtonGsComponent;
  let fixture: ComponentFixture<ButtonGsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonGsComponent]
    });
    fixture = TestBed.createComponent(ButtonGsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
