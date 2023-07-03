import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajKlijentaComponent } from './azuriraj-klijenta.component';

describe('AzurirajKlijentaComponent', () => {
  let component: AzurirajKlijentaComponent;
  let fixture: ComponentFixture<AzurirajKlijentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajKlijentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzurirajKlijentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
