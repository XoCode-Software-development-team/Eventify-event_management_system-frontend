import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotpasswordComponent } from './fogotpassword.component';

describe('FogotpasswordComponent', () => {
  let component: FogotpasswordComponent;
  let fixture: ComponentFixture<FogotpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FogotpasswordComponent]
    });
    fixture = TestBed.createComponent(FogotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
