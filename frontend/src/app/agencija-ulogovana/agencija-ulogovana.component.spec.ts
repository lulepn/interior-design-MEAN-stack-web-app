import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencijaUlogovanaComponent } from './agencija-ulogovana.component';

describe('AgencijaUlogovanaComponent', () => {
  let component: AgencijaUlogovanaComponent;
  let fixture: ComponentFixture<AgencijaUlogovanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencijaUlogovanaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencijaUlogovanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
