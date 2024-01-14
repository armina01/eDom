import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNjejgovateljComponent } from './nav-bar-njejgovatelj.component';

describe('NavBarNjejgovateljComponent', () => {
  let component: NavBarNjejgovateljComponent;
  let fixture: ComponentFixture<NavBarNjejgovateljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarNjejgovateljComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarNjejgovateljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
