import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUlogovanComponent } from './admin-ulogovan.component';

describe('AdminUlogovanComponent', () => {
  let component: AdminUlogovanComponent;
  let fixture: ComponentFixture<AdminUlogovanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUlogovanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUlogovanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
