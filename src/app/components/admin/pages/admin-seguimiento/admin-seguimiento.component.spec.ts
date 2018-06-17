import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeguimientoComponent } from './admin-seguimiento.component';

describe('AdminSeguimientoComponent', () => {
  let component: AdminSeguimientoComponent;
  let fixture: ComponentFixture<AdminSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
