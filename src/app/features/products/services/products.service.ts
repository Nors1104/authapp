import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private router: Router) {}
  /*
  findProducts(): Observable<Product[]> {
    return this.http
      .get<Observable<Product[]>>(`${environment.apiURL}/products`)
      .subscribe((data) => {
        debugger;
        return data;
      });
  }*/
  findProducts(): Observable<Product[]> {
    const token: string = localStorage.getItem('token') || '';
    const headers = {
      'x-token': token,
    };
    const url = `${environment.apiURL}/products`;
    return this.http.get<Product[]>(url, { headers });
  }
}
