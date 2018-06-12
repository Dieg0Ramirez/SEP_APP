import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistrarUsuarioComponent } from './admin-registrar-usuario.component';

describe('AdminRegistrarUsuarioComponent', () => {
  let component: AdminRegistrarUsuarioComponent;
  let fixture: ComponentFixture<AdminRegistrarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegistrarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
