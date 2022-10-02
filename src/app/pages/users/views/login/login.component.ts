import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-selector',
  templateUrl: './login.component.html',
  styleUrls: ['./login-register.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }
  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm?.['invalid']) return;
    const loginData = {
      email: this.loginForm?.['email'].value,
      password: this.loginForm?.['password'].value,
    };
    this.auth.login(loginData.email, loginData.password).subscribe({
      next: (user) => {
        this.authError = false;
        this.localstorageService.setToken(user?.token);
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, please try again later!';
        }
        if (error.status === 404) {
          this.authMessage = 'Email or Password are wrong';
        }
      },
    });
  }
}
