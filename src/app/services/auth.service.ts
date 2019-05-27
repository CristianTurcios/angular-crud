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

  getUserInformation(): Observable<any> {
    const token = this.getTokenPayload();
    const url = `${environment.apiUrl}/user/${token.id}`;
    return this.http.get(url);
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
