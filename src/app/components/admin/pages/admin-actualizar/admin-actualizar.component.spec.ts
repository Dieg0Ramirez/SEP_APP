import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActualizarComponent } from './admin-actualizar.component';

describe('AdminActualizarComponent', () => {
  let component: AdminActualizarComponent;
  let fixture: ComponentFixture<AdminActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
