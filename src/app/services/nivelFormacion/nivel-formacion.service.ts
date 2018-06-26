import { Injectable } from '@angular/core';
import { NivelFormacion } from '../../models/nivelFormacion.Models';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/tablaModels';
import { AlertifyService } from './../alertify/alertify.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NivelFormacionService {

  nivelFormacion: NivelFormacion;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioServices: UsuarioService,
    public alertify: AlertifyService
  ) {}

  // --------------------- Nivel de formacion --------------------- //

  crearNivelFormacion( nivelFormacion: NivelFormacion) {
    let url = URL_API + '/nivelFormacion';
    url += '/?token=' + this._usuarioServices.token;
    return this.http.post(url , nivelFormacion).pipe(
      map((resp: any) => {
        this.alertify.success('nivel de formacion creado con exito');
        return resp.Usuario;
    }));
  }

  actualizarNivelFormacion( nivelFormacion: NivelFormacion ) {
    let url = URL_API + '/nivelFormacion' + nivelFormacion._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, nivelFormacion ).pipe(
      map((resp: any) => {
        this.alertify.success('nivel de formacion actualizado con exito');
        return resp.Usuario;
      }));
  }

  listarNivelFormacion() {
    let url = URL_API + '/nivelFormacion';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
  }

  actualizarDisponibilidad(nivelFormacion: NivelFormacion) {
    let url = URL_API + '/nivelFormacion/disponible/' + nivelFormacion._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, nivelFormacion ).pipe(
      map((resp: any) => {
        this.alertify.success('disponibilidad actualizada');
        return resp.Cadena;
      }));
  }
}
