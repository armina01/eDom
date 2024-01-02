import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LijekComponent } from './lijek.component';

describe('LijekComponent', () => {
  let component: LijekComponent;
  let fixture: ComponentFixture<LijekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LijekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LijekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
