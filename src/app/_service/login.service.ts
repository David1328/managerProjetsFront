import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  paginaReactiva = new Subject<boolean>();
  private url: string = `${environment.HOST}login`;
  //http://localhost:60602/api/login/PostIngresoLogin
  constructor(private http: HttpClient,
    private router: Router) { }

  public login(user: Usuario) {
    //const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`;
    return this.http.post<any>(`${this.url}/PostIngresoLogin`, user);

  }
  public cerrarSesion() {
    const tk = sessionStorage.getItem(environment.TOKEN);
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.clear();
    console.log("Sesion cerrada correctamente.")
    window.location.reload();
  }


  public estaLogueado(): boolean {
    const tk = sessionStorage.getItem(environment.TOKEN);
    return tk != null;
  }
}
