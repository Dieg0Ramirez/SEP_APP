import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { DataTablesResponse } from '../../models/tablaModels';
import { UsuarioService } from '../usuario/usuario.service';
import { Aprendiz } from '../../models/aprendiz.models';
import { AlertifyService } from '../alertify/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AprendizService {


  constructor(
    public http: HttpClient,
    public _usuarioServices: UsuarioService,
    public alertify: AlertifyService
  ) { }

  listarApredices() {
    let url = URL_API + '/aprendiz';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
  }

  actualizarAprendices(filtros: Aprendiz) {
    let url = URL_API + '/aprendiz/' + filtros._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, filtros).pipe(
      map((resp: any) => {
        this.alertify.success('Aprendiz actualizado con éxito');
      }));
  }


}
