import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDoktorComponent } from './nav-bar-doktor.component';

describe('NavBarDoktorComponent', () => {
  let component: NavBarDoktorComponent;
  let fixture: ComponentFixture<NavBarDoktorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarDoktorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarDoktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
