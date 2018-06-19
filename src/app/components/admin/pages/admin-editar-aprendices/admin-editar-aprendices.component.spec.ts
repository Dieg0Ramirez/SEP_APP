import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarAprendicesComponent } from './admin-editar-aprendices.component';

describe('AdminEditarAprendicesComponent', () => {
  let component: AdminEditarAprendicesComponent;
  let fixture: ComponentFixture<AdminEditarAprendicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditarAprendicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditarAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
