import { Injectable } from '@angular/core';
import { TipoDocumento } from '../../models/tipoDocumento.Models';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataTablesResponse } from '../../models/tablaModels';
import { UsuarioService } from '../usuario/usuario.service';
import { AlertifyService } from './../alertify/alertify.service';



@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService,
    public alertify: AlertifyService
  ) {}

  creartipoDocumento( tipoDocumento: TipoDocumento) {
    let url = URL_API + '/tipoDocumento';
    url += '?token=' + this._usuarioServices.token;
    return this.http.post(url , tipoDocumento).pipe(
      map((resp: any) => {
      this.alertify.success('Tipo documento creada con éxito');
    }));
  }

  actualizartipoDocumento( tipoDocumento: TipoDocumento ) {
    let url = URL_API + '/tipoDocumento/' + tipoDocumento._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, tipoDocumento ).pipe(
      map((resp: any) => {
        this.alertify.success('Tipo documento actualizado con éxito');
      }));
  }
  actualizarDisponibilidad(tipoDocumento: TipoDocumento) {
    let url = URL_API + '/tipoDocumento/disponible/' + tipoDocumento._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, tipoDocumento ).pipe(
      map((resp: any) => {
        this.alertify.success('disponibilidad actualizada');
        return resp.tipoDocumento;
      }));
  }

  listartipoDocumento() {
  let url = URL_API + '/tipoDocumento';
  url += '?token=' + this._usuarioServices.token;

  return this.http.get<DataTablesResponse>(url);

  }
}
