import { Component, OnInit } from '@angular/core';

declare var AdminLTE: any;

@Component({
  selector: 'app-admi-nivel-formacion',
  templateUrl: './admi-nivel-formacion.component.html',
  styleUrls: ['./admi-nivel-formacion.component.css']
})
export class AdmiNivelFormacionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    AdminLTE.init();
  }

}
