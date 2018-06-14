import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContentComponent } from './components/admin/content/content.component';
import { ControlSidebarComponent } from './components/admin/control-sidebar/control-sidebar.component';
import { FooterComponent } from './components/admin/footer/footer.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { LeftSideComponent } from './components/admin/left-side/left-side.component';

import { AdminHomeComponent } from './components/admin/pages/admin-home/admin-home.component';
import { AdminProgramsComponent } from './components/admin/pages/admin-programs/admin-programs.component';
import { CadenasComponent } from './components/admin/pages/admin-cadenas/cadenas.component';
import { CreacionEstadoComponent } from './components/admin/pages/admin-creacion-estado/creacion-estado.component';
import { AdminRegistrarUsuarioComponent } from './components/admin/pages/admin-registrar-usuario/admin-registrar-usuario.component';

import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { AdminTipoDocumentoComponent } from './components/admin/pages/admin-tipo-documento/admin-tipo-documento.component';
import { AdminActualizarComponent } from './components/admin/pages/admin-actualizar/admin-actualizar.component';
import { AdminDatatablesComponent } from './components/admin/pages/admin-datatables/admin-datatables.component';





@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ContentComponent,
    ControlSidebarComponent,
    FooterComponent,
    HeaderComponent,
    LeftSideComponent,
    AdminHomeComponent,
    AdminProgramsComponent,
    CreacionEstadoComponent,
    CadenasComponent,
    AdminRegistrarUsuarioComponent,
    LoginComponent,
    AdminTipoDocumentoComponent,
    AdminActualizarComponent,
    AdminDatatablesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // PagesModule,
    FormsModule,
    ServicesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
