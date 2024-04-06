import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginObj: Login;
  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }
  onLogin() {
    debugger;
    this.http
      .post('http://localhost:3000/api/auth/login', this.loginObj)
      .subscribe((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/login');
        }
      });
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
