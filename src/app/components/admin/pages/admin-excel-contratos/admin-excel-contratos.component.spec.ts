import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExcelContratosComponent } from './admin-excel-contratos.component';

describe('AdminExcelContratosComponent', () => {
  let component: AdminExcelContratosComponent;
  let fixture: ComponentFixture<AdminExcelContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExcelContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExcelContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
