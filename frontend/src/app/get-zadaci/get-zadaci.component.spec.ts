import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetZadaciComponent } from './get-zadaci.component';

describe('GetZadaciComponent', () => {
  let component: GetZadaciComponent;
  let fixture: ComponentFixture<GetZadaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetZadaciComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetZadaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
