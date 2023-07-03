import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadniciComponent } from './radnici.component';

describe('RadniciComponent', () => {
  let component: RadniciComponent;
  let fixture: ComponentFixture<RadniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
