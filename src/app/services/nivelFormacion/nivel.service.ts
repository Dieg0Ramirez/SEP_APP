import { Injectable } from '@angular/core';
import { Programs } from '../../models/programs.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_API } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class Nivel {
  programs: Programs;
  token: string;

  constructor(public http: HttpClient, public router: Router) {}

  listarNiveles() {
    const url = URL_API + '/nivelFormacion';
    return this.http.get(url);
  }
}
