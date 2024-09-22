import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajVisePlanovaComponent } from './dodaj-vise-planova.component';

describe('DodajVisePlanovaComponent', () => {
  let component: DodajVisePlanovaComponent;
  let fixture: ComponentFixture<DodajVisePlanovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodajVisePlanovaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DodajVisePlanovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
