import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService as SocialAuth } from 'angularx-social-login';
import { FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean;
  showAlert: boolean;
  alertMessage: string;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private router: Router,
    private data: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private socialAuth: SocialAuth
  ) {
    this.submitted = false;
    this.showAlert = false;

    // If user has session return to home
    if (this.authService.sessionExists()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.data.changeTitle('Login');

    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuth.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if (user !== null) {

        const params = {
          username: `${user.name}_${user.id}`,
          role: 'Viewer',
          provider: user.provider
        };

        this.authService.loginUserSocialUsers(params).subscribe(data => {
          this.stepsAfterLogin(data.token);
        });
      }
    }, () => {
      this.socialAuth.signOut();
      this.cookieService.delete('jwt');
      this.router.navigate(['/login']);
    }) ;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.authService.loginUser(this.addForm.value).subscribe(data => {
        this.stepsAfterLogin(data.token);
      }, (err) => {
        this.showAlert = true;
        this.alertMessage = err.error !== null ? err.error.error : err.statusText;
      });
    }
  }

  stepsAfterLogin(token) {
    this.cookieService.set('jwt', token);
    this.showAlert = false;
    this.authService.loggedInUser();
    this.router.navigate(['']);
  }

  hideAlert() {
    this.showAlert = false;
  }

  signInWithFB(): void {
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  get f() { return this.addForm.controls; }
}
