import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-aprendices',
  templateUrl: './admin-aprendices.component.html',
  styleUrls: ['./admin-aprendices.component.css']
})
export class AdminAprendicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
