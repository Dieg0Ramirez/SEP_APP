import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-excel-contratos',
  templateUrl: './admin-excel-contratos.component.html',
  styleUrls: ['./admin-excel-contratos.component.css']
})
export class AdminExcelContratosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
