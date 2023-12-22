import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledSedmicnihZadatakaComponent } from './pregled-sedmicnih-zadataka.component';

describe('PregledSedmicnihZadatakaComponent', () => {
  let component: PregledSedmicnihZadatakaComponent;
  let fixture: ComponentFixture<PregledSedmicnihZadatakaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledSedmicnihZadatakaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledSedmicnihZadatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
