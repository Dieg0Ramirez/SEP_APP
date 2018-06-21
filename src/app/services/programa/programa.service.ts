import { Injectable } from '@angular/core';
import { Programs } from '../../models/programs.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { DataTablesResponse } from '../../models/tablaModels';


@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor( public http: HttpClient,
  public _usuarioServices: UsuarioService) { }

  crearPrograms(programs: Programs) {
    let url = URL_API + '/programa';
    url += '/?token=' + this._usuarioServices.token;

    return this.http.post(url, programs).pipe(
      map((resp: any) => {
        console.log(resp);
      }));
  }

  actualizarPrograms(programs: Programs) {
    let url = URL_API + '/programa' + programs._id;
    url += '?token=' + this._usuarioServices.token;
    return this.http.put(url, programs);
  }

  listarPrograms() {
    let url = URL_API + '/programa';
    url += '?token=' + this._usuarioServices.token;
    return this.http.get<DataTablesResponse>(url);
  }
}
