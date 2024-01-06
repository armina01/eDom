import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NjegovateljComponent } from './njegovatelj.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

describe('NjegovateljComponent', () => {
  let component: NjegovateljComponent;
  let fixture: ComponentFixture<NjegovateljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NjegovateljComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NjegovateljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
