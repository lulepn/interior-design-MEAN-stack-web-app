import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPoslaKlijentComponent } from './pregled-posla-klijent.component';

describe('PregledPoslaKlijentComponent', () => {
  let component: PregledPoslaKlijentComponent;
  let fixture: ComponentFixture<PregledPoslaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledPoslaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledPoslaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
