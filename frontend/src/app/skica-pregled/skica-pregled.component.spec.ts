import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaPregledComponent } from './skica-pregled.component';

describe('SkicaPregledComponent', () => {
  let component: SkicaPregledComponent;
  let fixture: ComponentFixture<SkicaPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaPregledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
