import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule, Routes, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const redirectUrl = next['_routerState']['url'];
    if (this.userService.isLogged()) {
     return true;
   }

   this.router.navigateByUrl(
      this.router.createUrlTree(
        ['login'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
