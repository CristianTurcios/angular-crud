import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode_temp from 'jwt-decode';
import { Observable, Subject } from 'rxjs';
const jwtDecode = jwt_decode_temp;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  // Subjects
  private userLoggedIn: Subject<void> = new Subject<void>();
  private userLogout: Subject<void> = new Subject<void>();


  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  loginUser(data: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  loginUserSocialUsers(data: object): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginSocialUser`, data);
  }

  loggedInUser(): void {
    this.userLoggedIn.next();
  }

  logoutUser(): void {
    this.userLogout.next();
  }

  getToken(): string {
    return this.cookieService.get('jwt');
  }

  getTokenPayload() {
    try {
      return jwtDecode(this.getToken());
    } catch (Error) {
      return null;
    }
  }

  getUserRole(): string {
    if (!this.getTokenPayload()) {
      return '';
    } else {
      return this.getTokenPayload().hasOwnProperty('userRole') ? this.getTokenPayload().userRole : '';
    }
  }

  sessionExists(): boolean {
    const tokenInfo = this.getTokenPayload();
    const token = this.getToken();

    if (!token || !tokenInfo) {
      return false;
    }
    return 'username' in tokenInfo ? true : false;
  }

  // Events
  onUserLoggedIn(): Subject<void> {
    return this.userLoggedIn;
  }

  onUserLogout(): Subject<void> {
    return this.userLogout;
  }
}
