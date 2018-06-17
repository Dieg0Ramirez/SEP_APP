import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiNivelFormacionComponent } from './admi-nivel-formacion.component';

describe('AdmiNivelFormacionComponent', () => {
  let component: AdmiNivelFormacionComponent;
  let fixture: ComponentFixture<AdmiNivelFormacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmiNivelFormacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmiNivelFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
