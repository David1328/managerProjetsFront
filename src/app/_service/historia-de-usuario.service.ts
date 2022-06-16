import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estado } from '../_model/Estados';
import { HistoriaDeUsuario } from '../_model/HistoriaDeUsuario';
import { Ticket } from '../_model/Ticket';

@Injectable({
  providedIn: 'root'
})
export class HistoriaDeUsuarioService {

  private url : string = `${environment.HOST}historiaDeUsuario`;
  
  constructor(private http: HttpClient) { }
  
  //OBTENER LA LISTA DE HISTORIAS DE USUARIO
  public getListaHistoriaDeUsuario(){
    return this.http.get<HistoriaDeUsuario[]>(`${this.url}/GetHistoriasDeUsuario`);
  }
  //AGREGAR NUEVA HISTORIA DE USUARIO
  public postNuevaHistoria(nuevaHistoria:HistoriaDeUsuario){
    return this.http.post<any>(`${this.url}/PostNuevaHistoria`,nuevaHistoria);
  }
}
