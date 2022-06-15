import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './_service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsuarioService } from './_service/usuario.service';
import { Usuario } from './_model/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'managerProjects';

  public flagSesion: boolean = false;
  public rol: number=0;
  public usuario: String ="";
  public idUser: any;

  constructor(private loginService:LoginService,
    private usuarioService:UsuarioService){

  }
  ngOnInit(): void {
    this.datos();
    this.loginService.paginaReactiva.subscribe((data) => {
      this.datos();
    });
  }

  cerrarSession() {
    this.loginService.cerrarSesion();
    this.ngOnInit();
  }

  datos() {
    this.flagSesion = this.loginService.estaLogueado();
    if (this.flagSesion == true) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)?.toString());
      this.rol = decodedToken.Rol;
      const user: string = decodedToken.Usuario;
      this.usuarioService.getInformationUser(user).subscribe(data=>{
        this.ingresoUsuario(data);
      })
    }
  }
  ingresoUsuario(usuarioIngreso: any) {
    this.usuario = usuarioIngreso.nombre;
  }
}
