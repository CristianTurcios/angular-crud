import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
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

  canActivate(): boolean {
    if (!this.auth.sessionExists()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
