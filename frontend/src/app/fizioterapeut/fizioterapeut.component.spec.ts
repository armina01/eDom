import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizioterapeutComponent } from './fizioterapeut.component';

describe('FizioterapeutComponent', () => {
  let component: FizioterapeutComponent;
  let fixture: ComponentFixture<FizioterapeutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FizioterapeutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FizioterapeutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
