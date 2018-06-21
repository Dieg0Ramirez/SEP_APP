import { Injectable } from '@angular/core';
import { NivelFormacion } from '../../models/nivelFormacion.Models';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/tablaModels';

@Injectable({
  providedIn: 'root'
})
export class NivelFormacionService {

  nivelFormacion: NivelFormacion;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5 )  ? true : false;
  }

  // --------------------- Nivel de formacion --------------------- //

   cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.nivelFormacion = JSON.parse(localStorage.getItem('nivelFormacion'));
    } else {
      this.token = '';
      this.nivelFormacion = null;
    }
  }

  guardarStorage( id: string, token: string, nivelFormacion: NivelFormacion ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'nivelFormacion', JSON.stringify(nivelFormacion) );

    this.nivelFormacion = nivelFormacion;
    this.token = token;
  }

  logout() {
    this.nivelFormacion = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('nivelFormacion');

    this.router.navigate(['']);

  }

  login(nivelFormacion: NivelFormacion ) {

    const url = URL_API + '/nivelFormacion';
    return this.http.post(url , nivelFormacion ).pipe(
               map((resp: any ) => {
                 this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
              }));
  }

  crearNivelFormacion( nivelFormacion: NivelFormacion) {
    let url = URL_API + '/nivelFormacion';
    url += '/?token=' + this.token;
    return this.http.post(url , nivelFormacion).pipe(
      map((resp: any) => {
      swal('Usuario creado', nivelFormacion.nombre, 'success' );
      return resp.Usuario;
    }));
  }

  actualizarNivelFormacion( nivelFormacion: NivelFormacion ) {
    let url = URL_API + '/nivelFormacion' + nivelFormacion._id;
    url += '?token=' + this.token;
    return this.http.put(url, nivelFormacion ).pipe(
      map((resp: any) => {
      swal('Usuario actualizado', nivelFormacion.nombre, 'success' );
      return resp.Usuario;
      }));
  }

  listarNivelFormacion() {
  let url = URL_API + '/nivelFormacion';
  url += '?token=' + this.token;

  return this.http.get<DataTablesResponse>(url);

  }
}
