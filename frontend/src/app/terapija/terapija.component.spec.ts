import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapijaComponent } from './terapija.component';

describe('TerapijaComponent', () => {
  let component: TerapijaComponent;
  let fixture: ComponentFixture<TerapijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerapijaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerapijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
