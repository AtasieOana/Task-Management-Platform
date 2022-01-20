import { Injectable }     from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userLogged = localStorage.getItem('userLogged');

    if (userLogged) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}

