import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '@envs/environment';
import { UserDataService } from './userData.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userDataService: UserDataService,
    private userservice: UserService
  ) {}
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

  doLogin({ correo, password }: { correo: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiURL}/auth/login`, {
        correo,
        password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('token', response.token);
          this.userDataService.updateUserId(response.user.uid); //eetsa no va bien
          this.userDataService.setId(response.user.uid);
          this.userservice.setId(response.user.uid);
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
  isTokenExpired() {
    const token = localStorage.getItem('token') || '';
    if (token) {
      debugger;
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return tokenPayload.exp < now;
    }
    return true;
  }
}
