import { Injectable } from '@angular/core';
import { TipoDocumento } from '../../models/tipoDocumento.Models';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/tablaModels';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  tipoDocumento: TipoDocumento;
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
      this.tipoDocumento = JSON.parse(localStorage.getItem('nivelFormacion'));
    } else {
      this.token = '';
      this.tipoDocumento = null;
    }
  }

  guardarStorage( id: string, token: string, tipoDocumento: TipoDocumento ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'tipoDocumento', JSON.stringify(tipoDocumento) );

    this.tipoDocumento = tipoDocumento;
    this.token = token;
  }

  logout() {
    this.tipoDocumento = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('tipoDocumento');

    this.router.navigate(['']);

  }

  login(tipoDocumento: TipoDocumento ) {

    const url = URL_API + '/tipoDocumento';
    return this.http.post(url , tipoDocumento ).pipe(
               map((resp: any ) => {
                 this.guardarStorage( resp.id, resp.token, resp.usuario );
              return true;
              }));
  }

  creartipoDocumento( tipoDocumento: TipoDocumento) {
    let url = URL_API + '/tipoDocumento';
    url += '/?token=' + this.token;
    return this.http.post(url , tipoDocumento).pipe(
      map((resp: any) => {
      swal('Usuario creado', tipoDocumento.nombre, 'success' );
      return resp.Usuario;
    }));
  }

  actualizartipoDocumento( tipoDocumento: TipoDocumento ) {
    let url = URL_API + '/tipoDocumento' + tipoDocumento._id;
    url += '?token=' + this.token;
    return this.http.put(url, tipoDocumento ).pipe(
      map((resp: any) => {
      swal('Usuario actualizado', tipoDocumento.nombre, 'success' );
      return resp.Usuario;
      }));
  }

  listartipoDocumento() {
  let url = URL_API + '/tipoDocumento';
  url += '?token=' + this.token;

  return this.http.get<DataTablesResponse>(url);

  }
}
