import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledArhiveZadatakaComponent } from './pregled-arhive-zadataka.component';

describe('PregledArhiveZadatakaComponent', () => {
  let component: PregledArhiveZadatakaComponent;
  let fixture: ComponentFixture<PregledArhiveZadatakaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledArhiveZadatakaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledArhiveZadatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
