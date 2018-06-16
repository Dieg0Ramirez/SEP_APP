import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAprendicesComponent } from './admin-aprendices.component';

describe('AdminAprendicesComponent', () => {
  let component: AdminAprendicesComponent;
  let fixture: ComponentFixture<AdminAprendicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAprendicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
