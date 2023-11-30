import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKorisnikaDomaComponent } from './pregled-korisnika-doma.component';

describe('PregledKorisnikaDomaComponent', () => {
  let component: PregledKorisnikaDomaComponent;
  let fixture: ComponentFixture<PregledKorisnikaDomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledKorisnikaDomaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledKorisnikaDomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
