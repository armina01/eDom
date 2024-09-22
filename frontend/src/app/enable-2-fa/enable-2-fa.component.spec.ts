import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Enable2FAComponent } from './enable-2-fa.component';

describe('Enable2FAComponent', () => {
  let component: Enable2FAComponent;
  let fixture: ComponentFixture<Enable2FAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Enable2FAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Enable2FAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
