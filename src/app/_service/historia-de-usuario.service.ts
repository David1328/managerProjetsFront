import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HistoriaDeUsuario } from '../_model/HistoriaDeUsuario';

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
}
