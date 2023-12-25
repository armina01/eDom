import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPodatakaNutricionistaComponent } from './pregled-podataka-nutricionista.component';

describe('PregledPodatakaNutricionistaComponent', () => {
  let component: PregledPodatakaNutricionistaComponent;
  let fixture: ComponentFixture<PregledPodatakaNutricionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledPodatakaNutricionistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledPodatakaNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
