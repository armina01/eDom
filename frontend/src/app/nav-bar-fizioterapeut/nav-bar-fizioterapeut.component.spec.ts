import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarFizioterapeutComponent } from './nav-bar-fizioterapeut.component';

describe('NavBarFizioterapeutComponent', () => {
  let component: NavBarFizioterapeutComponent;
  let fixture: ComponentFixture<NavBarFizioterapeutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarFizioterapeutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarFizioterapeutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
