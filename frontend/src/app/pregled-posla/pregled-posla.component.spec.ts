import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledPoslaComponent } from './pregled-posla.component';

describe('PregledPoslaComponent', () => {
  let component: PregledPoslaComponent;
  let fixture: ComponentFixture<PregledPoslaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledPoslaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledPoslaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
