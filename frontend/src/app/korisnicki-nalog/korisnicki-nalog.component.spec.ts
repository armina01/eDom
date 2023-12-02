import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnickiNalogComponent } from './korisnicki-nalog.component';

describe('KorisnickiNalogComponent', () => {
  let component: KorisnickiNalogComponent;
  let fixture: ComponentFixture<KorisnickiNalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnickiNalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KorisnickiNalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
