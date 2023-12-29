import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPodatakaNjegovateljComponent } from './pregled-podataka-njegovatelj.component';

describe('PregledPodatakaNjegovateljComponent', () => {
  let component: PregledPodatakaNjegovateljComponent;
  let fixture: ComponentFixture<PregledPodatakaNjegovateljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledPodatakaNjegovateljComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledPodatakaNjegovateljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
