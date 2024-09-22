import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizioTerapijaComponent } from './fizio-terapija.component';

describe('FizioTerapijaComponent', () => {
  let component: FizioTerapijaComponent;
  let fixture: ComponentFixture<FizioTerapijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FizioTerapijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FizioTerapijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
