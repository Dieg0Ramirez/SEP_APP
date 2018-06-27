import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { DataTablesResponse } from '../../models/tablaModels';
import { AlertifyService } from './../alertify/alertify.service';
import { Alternativa } from './../../models/alternativa.models';

@Injectable({
  providedIn: 'root'
})
export class AlternativaService {

  constructor( public http: HttpClient,
  public _usuarioServices: UsuarioService,
  public alertify: AlertifyService ) { }

crearAlternativa( alternativa: Alternativa) {
  let url = URL_API + '/alternativa';
  url += '?token=' + this._usuarioServices.token;

  return this.http.post(url , alternativa).pipe(
    map((resp: any) => {
      console.log(resp);
      this.alertify.success('Alternativa creada con éxito');
    }));

  }

  actualizarAlternativa(alternativa: Alternativa) {
    let url = URL_API + '/alternativa/' + alternativa._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url , alternativa );
  }

  listarAlternativa() {
    let url = URL_API + '/alternativa';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);

  }

  actualizarDisponibilidad(alternativa: Alternativa) {
    let url = URL_API + '/cadena/disponible/' + alternativa._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, alternativa ).pipe(
      map((resp: any) => {
        this.alertify.success('disponibilidad actualizada');
      return resp.Cadena;
      }));
  }

}
