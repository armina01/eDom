import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPodatakaDoktorComponent } from './pregled-podataka-doktor.component';

describe('PregledPodatakaDoktorComponent', () => {
  let component: PregledPodatakaDoktorComponent;
  let fixture: ComponentFixture<PregledPodatakaDoktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledPodatakaDoktorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledPodatakaDoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
