import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  path: string;

  constructor(
    public auth: AuthService,
    public router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.sessionExists()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      const roles = route.data['roles'];
      let authorization = null;
      if (roles) {
        const userRole = this.auth.getTokenPayload().userRole;
        authorization = roles.indexOf(userRole) !== -1 ? true : false;
        return authorization ? true : false;
      } else { return false; }
    }
  }
}
