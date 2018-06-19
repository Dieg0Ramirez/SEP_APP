import { Injectable } from '@angular/core';
import { Programs } from '../../models/programs.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  programs: Programs;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaCreado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.programs = JSON.parse(localStorage.getItem('programs'));
    } else {
      this.token = '';
      this.programs = null;
    }
  }

  guardarStorage(id: string, token: string, programs: Programs) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('programs', JSON.stringify(programs));

    this.programs = programs;
    this.token = token;
  }

  logout() {
    this.programs = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('programs');

    this.router.navigate(['/login']);
  }

  login(programs: Programs) {

    const url = URL_API + '/login';
    return this.http.post(url, programs).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.programs);
        return true;
      }));
  }

  crearPrograms(programs: Programs) {
    let url = URL_API + '/programa';
    url += '/?token=' + this.token;
    return this.http.post(url, programs).pipe(
      map((resp: any) => {
        swal('Programa creado', programs.nombre, 'success');
        return resp.Programs;
      }));
  }

  actualizarPrograms(programs: Programs) {
    let url = URL_API + '/programa' + programs._id;
    url += '?token=' + this.token;
    return this.http.put(url, programs).pipe(
      map((resp: any) => {
        swal('Programa actualizado', programs.nombre, 'success');
        return resp.Programs;
      }));
  }

  listarPrograms(desde: number) {
    let url = URL_API + '/programa?desde=' + desde;
    url += '&token=' + this.token;
    return this.http.get(url);
  }
}
