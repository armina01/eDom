import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapomenaComponent } from './napomena.component';

describe('NapomenaComponent', () => {
  let component: NapomenaComponent;
  let fixture: ComponentFixture<NapomenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NapomenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NapomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
