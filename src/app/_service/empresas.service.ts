import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresa } from '../_model/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url : string = `${environment.HOST}empresa`;
  
  constructor(private http: HttpClient) { }
  
  //OBTENER LA LISTA DE EMPRESAS
  public getListaEmpresas(){
    return this.http.get<Empresa[]>(`${this.url}/GetListCompany`);
  }
}
