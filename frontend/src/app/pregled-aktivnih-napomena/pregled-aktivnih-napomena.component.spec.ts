import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledAktivnihNapomenaComponent } from './pregled-aktivnih-napomena.component';

describe('PregledAktivnihNapomenaComponent', () => {
  let component: PregledAktivnihNapomenaComponent;
  let fixture: ComponentFixture<PregledAktivnihNapomenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledAktivnihNapomenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledAktivnihNapomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
