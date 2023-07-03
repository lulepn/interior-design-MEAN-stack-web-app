import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajAgencijuComponent } from './azuriraj-agenciju.component';

describe('AzurirajAgencijuComponent', () => {
  let component: AzurirajAgencijuComponent;
  let fixture: ComponentFixture<AzurirajAgencijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajAgencijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajAgencijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
