import { Injectable }     from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class TokenGuard implements CanActivate {


  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userSignUp = localStorage.getItem('userSignUp');

    if (userSignUp) {
      return true;
    } else {
      this.router.navigate(['']);
      return false
    }
  }
}

