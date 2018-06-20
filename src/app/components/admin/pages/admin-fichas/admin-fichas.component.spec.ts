import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFichasComponent } from './admin-fichas.component';

describe('AdminFichasComponent', () => {
  let component: AdminFichasComponent;
  let fixture: ComponentFixture<AdminFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
