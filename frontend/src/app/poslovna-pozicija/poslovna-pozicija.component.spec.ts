import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoslovnaPozicijaComponent } from './poslovna-pozicija.component';

describe('PoslovnaPozicijaComponent', () => {
  let component: PoslovnaPozicijaComponent;
  let fixture: ComponentFixture<PoslovnaPozicijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoslovnaPozicijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoslovnaPozicijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
