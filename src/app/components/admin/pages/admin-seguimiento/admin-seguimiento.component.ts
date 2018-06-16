import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-seguimiento',
  templateUrl: './admin-seguimiento.component.html',
  styleUrls: ['./admin-seguimiento.component.css']
})
export class AdminSeguimientoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
