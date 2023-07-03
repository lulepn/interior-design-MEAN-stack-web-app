import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediProfilKlComponent } from './uredi-profil-kl.component';

describe('UrediProfilKlComponent', () => {
  let component: UrediProfilKlComponent;
  let fixture: ComponentFixture<UrediProfilKlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediProfilKlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediProfilKlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
