import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../_model/Proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url : string = `${environment.HOST}proyecto`;
  
  constructor(private http: HttpClient) { }
  
  //OBTENER LA LISTA DE PROYECTOS
  public getListaEmpresas(){
    return this.http.get<Proyecto[]>(`${this.url}/GetListaProyectos`);
  }

  //para agregar un nuevo proyecto
  public postNuevoProyecto(nuevoProyecto:Proyecto){
    return this.http.post<any>(`${this.url}/PostNuevoProyecto`,nuevoProyecto)
  }
}
