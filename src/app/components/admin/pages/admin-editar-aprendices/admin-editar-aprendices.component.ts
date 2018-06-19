import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;
@Component({
  selector: 'app-admin-editar-aprendices',
  templateUrl: './admin-editar-aprendices.component.html',
  styleUrls: ['./admin-editar-aprendices.component.css']
})
export class AdminEditarAprendicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
