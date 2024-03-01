import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginformComponent } from './loginform.component';

describe('LoginformComponent', () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginformComponent]
    });
    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
