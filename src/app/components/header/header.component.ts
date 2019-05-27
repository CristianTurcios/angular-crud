import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userRole: string;
  hasSession: boolean;
  isOpenMenuMobile: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.isOpenMenuMobile = false;
    this.hasSession = this.authService.sessionExists();
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit() {
    this.authService.onUserLoggedIn().subscribe(() => {
      this.userRole = this.authService.getUserRole();
      this.hasSession = this.authService.sessionExists();
    });
  }

  openHamburgerMenu(): void {
    this.isOpenMenuMobile = !this.isOpenMenuMobile;
  }

  logout(): void {
    this.hasSession = false;
    this.cookieService.delete('jwt');
    this.router.navigate(['/login']);
  }
}
