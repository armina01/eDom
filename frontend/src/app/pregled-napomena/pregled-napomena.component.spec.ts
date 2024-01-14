import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledNapomenaComponent } from './pregled-napomena.component';

describe('PregledNapomenaComponent', () => {
  let component: PregledNapomenaComponent;
  let fixture: ComponentFixture<PregledNapomenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregledNapomenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PregledNapomenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
