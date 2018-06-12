import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-creacion-estado',
  templateUrl: './creacion-estado.component.html',
  styleUrls: ['./creacion-estado.component.css']
})
export class CreacionEstadoComponent implements OnInit {
  listEstado = [];

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

  updateCreacionEstado(estado) {

  }

  estadoCreacionEstado(estado) {

  }

}
