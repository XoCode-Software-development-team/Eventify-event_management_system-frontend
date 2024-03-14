import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesButtonsComponent } from './guides-buttons.component';

describe('GuidesButtonsComponent', () => {
  let component: GuidesButtonsComponent;
  let fixture: ComponentFixture<GuidesButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidesButtonsComponent]
    });
    fixture = TestBed.createComponent(GuidesButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
