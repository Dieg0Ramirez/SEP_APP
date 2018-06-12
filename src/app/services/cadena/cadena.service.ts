import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../../config/config';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CadenaService {

  constructor( public htt: HttpClient ) { }

// crearCadena( usuario: Usuario) {
//   let url = URL_API + '/usuario';
//   url += '/?token=' + this.token;
//   return this.http.post(url , usuario).pipe(
//   }
}
