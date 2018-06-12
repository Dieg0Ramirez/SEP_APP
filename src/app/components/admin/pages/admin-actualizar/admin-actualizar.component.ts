import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-actualizar',
  templateUrl: './admin-actualizar.component.html',
  styleUrls: ['./admin-actualizar.component.css']
})
export class AdminActualizarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
