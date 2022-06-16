import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../_model/Estados';
import { HistoriaDeUsuario } from '../_model/HistoriaDeUsuario';
import { Ticket } from '../_model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private url : string = `${environment.HOST}ticket`;
  
  constructor(private http: HttpClient) { }
  
  //OBTENER LA LISTA DE TICKETS
  public getListaTickets(id_historia:number){
    return this.http.get<Ticket[]>(`${this.url}/GetTicketsDeLaHistoria/`+id_historia);
  }

  //OBTENER TICKET 
  public getTicket(id_historia:number,id_ticket:number){
    return this.http.get<Ticket>(`${this.url}/GetTicketDeLaHistoria/`+id_historia+'/'+id_ticket);
  }
  //Agregar un nuevo ticket
  public postNuevoTicket(nuevoTicket:HistoriaDeUsuario){
    return this.http.post<any>(`${this.url}/PostNuevoTicket`,nuevoTicket)
  }
  //Actualizar ticket
  public putTicket(ticketParaActualizar:HistoriaDeUsuario){
    return this.http.put<any>(`${this.url}/PutActualizarTicket`,ticketParaActualizar)
  }
  //OBTENER ESTADOS
  public getEstados(){
    return this.http.get<Estado[]>(`${this.url}/GetlistaEstados`);
  }
}
