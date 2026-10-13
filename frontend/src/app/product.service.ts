import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/products';

  getAll(): Observable<Product[]> { return this.http.get<Product[]>(this.api); }
  getOne(id: number): Observable<Product> { return this.http.get<Product>(`${this.api}/${id}`); }
  create(p: Product): Observable<Product> { return this.http.post<Product>(this.api, p); }
  update(id: number, p: Product): Observable<Product> { return this.http.put<Product>(`${this.api}/${id}`, p); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
