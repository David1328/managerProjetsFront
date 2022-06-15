import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarTicketComponent } from './pages/administrar-ticket/administrar-ticket.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { RegistroHistoriUsuarioComponent } from './pages/registro-histori-usuario/registro-histori-usuario.component';
import { RegistroProyectoComponent } from './pages/registro-proyecto/registro-proyecto.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';

import { GuardianService } from './_service/guardian.service';

const routes: Routes = [
  //Registro usuario
  {path: 'registroUsuario', component: RegistroUsuarioComponent},
  //agregar proyecto
  {path: 'agregarProyecto', component: RegistroProyectoComponent},
  //administrar ticket
  {path: 'administrarTicket', component: AdministrarTicketComponent},
  //agregar historia de usuario
  {path: 'agregarHistoria', component: RegistroHistoriUsuarioComponent, canActivate: [GuardianService]},
  //inicio de session
  {path: 'ingreso', component: IngresoComponent},
  {path: '', component: IngresoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
