import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlternativaPracticaComponent } from './admin-alternativa-practica.component';

describe('AdminAlternativaPracticaComponent', () => {
  let component: AdminAlternativaPracticaComponent;
  let fixture: ComponentFixture<AdminAlternativaPracticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAlternativaPracticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlternativaPracticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
