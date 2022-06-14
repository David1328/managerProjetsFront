import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url : string = `${environment.HOST}usuario`;
  
  constructor(private http: HttpClient) { }
  
  //Agregar Usuario nuevo
  public postAgregarUsuarioNuevo(usuarioNuevo :Usuario){
    return this.http.post<any>(`${this.url}/PostNuevoUsuario`,usuarioNuevo);
  }
}
