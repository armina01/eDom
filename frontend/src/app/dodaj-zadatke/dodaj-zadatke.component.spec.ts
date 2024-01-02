import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajZadatkeComponent } from './dodaj-zadatke.component';

describe('DodajZadatkeComponent', () => {
  let component: DodajZadatkeComponent;
  let fixture: ComponentFixture<DodajZadatkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajZadatkeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodajZadatkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
