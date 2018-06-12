import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-tipo-documento',
  templateUrl: './admin-tipo-documento.component.html',
  styleUrls: ['./admin-tipo-documento.component.css']
})
export class AdminTipoDocumentoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

  updateDocumento(document) {

  }

  estadoDocumento(document) {

  }

}
