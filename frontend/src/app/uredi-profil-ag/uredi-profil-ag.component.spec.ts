import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediProfilAgComponent } from './uredi-profil-ag.component';

describe('UrediProfilAgComponent', () => {
  let component: UrediProfilAgComponent;
  let fixture: ComponentFixture<UrediProfilAgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediProfilAgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediProfilAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
