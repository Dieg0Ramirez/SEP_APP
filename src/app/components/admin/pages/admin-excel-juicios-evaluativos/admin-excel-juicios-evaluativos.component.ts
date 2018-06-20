import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-excel-juicios-evaluativos',
  templateUrl: './admin-excel-juicios-evaluativos.component.html',
  styleUrls: ['./admin-excel-juicios-evaluativos.component.css']
})
export class AdminExcelJuiciosEvaluativosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
