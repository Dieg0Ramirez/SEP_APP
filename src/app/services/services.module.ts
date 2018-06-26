import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  UsuarioService,
  LoginGuardGuard,
  ProgramaService,
  ExcelService
 } from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    LoginGuardGuard,
    ProgramaService,
    ExcelService
  ],
  declarations: []
})
export class ServicesModule { }







