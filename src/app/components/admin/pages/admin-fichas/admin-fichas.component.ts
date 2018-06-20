import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-fichas',
  templateUrl: './admin-fichas.component.html',
  styleUrls: ['./admin-fichas.component.css']
})
export class AdminFichasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
