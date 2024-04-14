import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, filter, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  // uso una interfaz anonima
  doRegister(values: {
    nombre: string;
    correo: string;
    password: string;
    rol: string;
  }) {
    this.http
      .post(`${environment.apiURL}/users/register`, values)
      .subscribe((response) => {
        this.router.navigateByUrl('/auth/login');
      });
  }

  doLogin(values: { correo: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiURL}/auth/login`, values)
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/dashboard');
        })
      );
    // angular previo version 17
    // this.http.post(`${environment.apiURL}/auth/login`, values).subscribe(
    //   (res: any) => {
    //     debugger;
    //     if (res.token) {
    //       localStorage.setItem('token', res.token);
    //       this.router.navigateByUrl('/dashboard');
    //     } else {
    //       this.router.navigateByUrl('/login');
    //     }
    //   },
    //   (err) => {
    //     debugger;
    //     throw Error(err.error);
    //   }
    // );
  }

  isAuth() {
    const token = localStorage.getItem('token') || '';
    // TODO evaluar exp del token
    return token.length > 0;
  }
}
