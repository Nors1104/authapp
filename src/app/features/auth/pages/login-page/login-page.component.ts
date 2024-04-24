import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DOCUMENT } from '@angular/common';
import RegisterValidator from '../register-page/register.validator';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  //loginObj: Login;
  submitted = false;
  loginForm = this.fb.group({
    correo: ['test1@gmail.com', [Validators.required, Validators.email]],
    password: [
      '123456',
      [Validators.required, Validators.minLength(6), Validators.maxLength(13)],
    ],
    checkbox: [''],
  });
  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(13)],
    ],
    confirmPassword: ['', Validators.required],
    rol: ['USER_ROLE', Validators.required],
  });
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any
  ) {
    //this.loginObj = new Login();
  }
  ngOnInit(): void {
    //this.document.body.classList.add('loginbg');
  }
  get controls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const { checkbox, ...form } = this.loginForm.value;

    this.authService
      .doLogin({
        correo: form.correo!,
        password: form.password!,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Atención', 'Bienvenido Norman');
        },
        error: ({ error }) => {
          debugger;
          this.toastr.error('Error', error.msg);
        },
      });
  }

  /*
  onLogin() {
    this.authService.doLogin(this.loginObj).subscribe({
      next: () => {
        this.toastr.success('Atención', 'Bienvenido Norman');
      },
      error: ({ error }) => {
        debugger;
        this.toastr.error('Error', error.msg);
      },
    });
    // this.http
    //   .post('http://localhost:3000/api/auth/login', this.loginObj)
    //   .subscribe((res: any) => {
    //     if (res.token) {
    //       localStorage.setItem('token', res.token);
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       this.router.navigateByUrl('/login');
    //     }
    //   });
  }*/
}

export class Login {
  correo: string;
  password: string;
  constructor() {
    this.correo = '';
    this.password = '';
  }
}
