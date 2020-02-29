import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAutomaticoGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private verificaEstadoUsuario(): Observable<boolean> {
    return this.authService.isAutenticado.pipe(
      tap(autenticado => autenticado ? this.router.navigate(['/barbearias']) : null),
      map(autenticado => !autenticado));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.verificaEstadoUsuario();
  }

}
