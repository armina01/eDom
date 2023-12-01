import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpstinaComponent } from './opstina.component';

describe('OpstinaComponent', () => {
  let component: OpstinaComponent;
  let fixture: ComponentFixture<OpstinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpstinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpstinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
