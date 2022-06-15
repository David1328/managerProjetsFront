import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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
      //Apartados solo para Docentes
      if ((url.includes('/agregarHistoria')) && (decodedToken != null)) {
        return true;
      }
      else if ((url.includes('/administrarActividad')) && (decodedToken != null)) {
        return true;
      }
      else if ((url.includes('/misActividades')) && (decodedToken != null)) {
        return true;
      }
      //Apartados que pueden ver los docentes y los estudiantes
      else if ((url.includes('/pecs')) && (decodedToken != null || decodedToken != null)) {
        return true;
      }
      else if ((url.includes('/evaluacionInicial')) && (decodedToken != null || decodedToken != null)) {
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
