import { AlertifyService } from './../alertify/alertify.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/tablaModels';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    private alertify: AlertifyService
  ) {
    this.cargarStorage();
  }


  estaLogueado() {
    return (this.token.length > 5 )  ? true : false;
  }


  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  login(usuario: Usuario ) {

    const url = URL_API + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  crearUsuario( usuario: Usuario) {
    let url = URL_API + '/usuario';
    url += '/?token=' + this.token;
    return this.http.post(url , usuario).pipe(
      map((resp: any) => {
      swal('Usuario creado', usuario.email, 'success' );
      return resp.Usuario;
    }));
  }

  actualizarUsuario( usuario: Usuario ) {
    let url = URL_API + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario ).pipe(
      map((resp: any) => {
      swal('Usuario actualizado', usuario.email, 'success' );
      return resp.Usuario;
      }));
  }

  listarUsuario() {
  let url = URL_API + '/usuario';
  url += '?token=' + this.token;

  return this.http.get<DataTablesResponse>(url);

  }

  actualizarDisponibilidad(usuario: Usuario) {
    let url = URL_API + '/usuario/disponible/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario ).pipe(
      map((resp: any) => {
        this.alertify.success('disponibilidad actualizada');
        return resp.Usuario;
      }));
  }

}


