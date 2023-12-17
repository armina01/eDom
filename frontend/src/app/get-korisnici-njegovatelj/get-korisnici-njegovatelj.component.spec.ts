import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetKorisniciNjegovateljComponent } from './get-korisnici-njegovatelj.component';

describe('GetKorisniciNjegovateljComponent', () => {
  let component: GetKorisniciNjegovateljComponent;
  let fixture: ComponentFixture<GetKorisniciNjegovateljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetKorisniciNjegovateljComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetKorisniciNjegovateljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
