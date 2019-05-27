import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(
    private router: Router,
    private data: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
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
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.authService.loginUser(this.addForm.value).subscribe(data => {
        this.cookieService.set('jwt', data.token);
        this.showAlert = false;
        this.authService.loggedInUser();
        this.router.navigate(['']);
      }, (err) => {
        this.showAlert = true;
        this.alertMessage = err.error !== null ? err.error.error : err.statusText;
      }) ;
    }
  }

  hideAlert() {
    this.showAlert = false;
  }

  get f() { return this.addForm.controls; }
}
