import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExcelJuiciosEvaluativosComponent } from './admin-excel-juicios-evaluativos.component';

describe('AdminExcelJuiciosEvaluativosComponent', () => {
  let component: AdminExcelJuiciosEvaluativosComponent;
  let fixture: ComponentFixture<AdminExcelJuiciosEvaluativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminExcelJuiciosEvaluativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExcelJuiciosEvaluativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
