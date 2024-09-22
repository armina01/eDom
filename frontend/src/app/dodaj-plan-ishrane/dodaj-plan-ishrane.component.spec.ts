import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPlanIshraneComponent } from './dodaj-plan-ishrane.component';

describe('DodajPlanIshraneComponent', () => {
  let component: DodajPlanIshraneComponent;
  let fixture: ComponentFixture<DodajPlanIshraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajPlanIshraneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodajPlanIshraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
