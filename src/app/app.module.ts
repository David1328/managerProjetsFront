import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module'
import {MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RegistroHistoriUsuarioComponent } from './pages/registro-histori-usuario/registro-histori-usuario.component';
import { AdministrarTicketComponent } from './pages/administrar-ticket/administrar-ticket.component';
import { RegistroProyectoComponent } from './pages/registro-proyecto/registro-proyecto.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    IngresoComponent,
    RegistroHistoriUsuarioComponent,
    AdministrarTicketComponent,
    RegistroProyectoComponent,
    RegistroUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
