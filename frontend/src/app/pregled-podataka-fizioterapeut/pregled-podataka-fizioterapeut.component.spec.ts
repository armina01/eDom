import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPodatakaFizioterapeutComponent } from './pregled-podataka-fizioterapeut.component';

describe('PregledPodatakaFizioterapeutComponent', () => {
  let component: PregledPodatakaFizioterapeutComponent;
  let fixture: ComponentFixture<PregledPodatakaFizioterapeutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledPodatakaFizioterapeutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledPodatakaFizioterapeutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
