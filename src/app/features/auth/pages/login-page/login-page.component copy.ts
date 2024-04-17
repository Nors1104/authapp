import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginObj: Login;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.loginObj = new Login();
  }
  ngOnInit(): void {
    this.document.body.classList.add('loginbg');
  }
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
  }
}

export class Login {
  correo: string;
  password: string;
  constructor() {
    this.correo = '';
    this.password = '';
  }
}
