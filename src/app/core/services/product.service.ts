import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(search = '', category = 'All'): Observable<Product[]> {
        let params = new HttpParams();
        if (search) params = params.set('search', search);
        if (category && category !== 'All') params = params.set('category', category);
        return this.http.get<Product[]>(this.apiUrl, { params });
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/categories`);
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    getFeaturedProducts(limit: number = 4): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}?limit=${limit}`);
    }
}
