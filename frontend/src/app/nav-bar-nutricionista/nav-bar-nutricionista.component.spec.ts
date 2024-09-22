import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNutricionistaComponent } from './nav-bar-nutricionista.component';

describe('NavBarNutricionistaComponent', () => {
  let component: NavBarNutricionistaComponent;
  let fixture: ComponentFixture<NavBarNutricionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarNutricionistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
