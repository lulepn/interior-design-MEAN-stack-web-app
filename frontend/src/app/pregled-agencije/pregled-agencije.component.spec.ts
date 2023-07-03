import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledAgencijeComponent } from './pregled-agencije.component';

describe('PregledAgencijeComponent', () => {
  let component: PregledAgencijeComponent;
  let fixture: ComponentFixture<PregledAgencijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledAgencijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledAgencijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
