import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



/**
 * Esta clase se activa al momento de acceder a una url del proyecto
 * y poder controllar su puede ingresar
 * siempre y cuando en el app routing la direccion de acceso tenga el 
 * canActive
 */
@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let url = state.url;
    try {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)?.toString());
      //Para acceder a agregar una historia de usuario
      if ((url.includes('/agregarHistoria')) && (decodedToken != null)) {
        return true;
      }
      //Para acceder administrar los tickets
      else if ((url.includes('/administrarTicket')) && (decodedToken != null)) {
        return true;
      }
      //Para acceder a agregar un proyecto nuevo
      else if ((url.includes('/agregarProyecto')) && (decodedToken != null)) {
        return true;
      }
      else {
        this.router.navigate(['']);
      }
    } catch (e) {
      this.router.navigate(['']);
    }
    throw new Error('Method not implemented.');
  }

}
