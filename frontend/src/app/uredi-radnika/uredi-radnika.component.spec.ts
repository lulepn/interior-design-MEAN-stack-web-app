import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrediRadnikaComponent } from './uredi-radnika.component';

describe('UrediRadnikaComponent', () => {
  let component: UrediRadnikaComponent;
  let fixture: ComponentFixture<UrediRadnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrediRadnikaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrediRadnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
