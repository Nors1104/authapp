import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginObj: Login;
  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.loginObj = new Login();
  }
  onLogin() {
    try {
      this.authService.doLogin(this.loginObj);
    } catch (err) {
      debugger;
      this.toastr.error('Error', 'dddd');
    }

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
