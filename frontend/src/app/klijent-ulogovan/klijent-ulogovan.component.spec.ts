import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentUlogovanComponent } from './klijent-ulogovan.component';

describe('KlijentUlogovanComponent', () => {
  let component: KlijentUlogovanComponent;
  let fixture: ComponentFixture<KlijentUlogovanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlijentUlogovanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentUlogovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
