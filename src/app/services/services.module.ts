import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  UsuarioService,
  LoginGuardGuard,
  ProgramaService
 } from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    LoginGuardGuard,
    ProgramaService
  ],
  declarations: []
})
export class ServicesModule { }







