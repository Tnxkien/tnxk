import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { endPoint } from '../shared/baseURL';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public _idProductSubject$ = new BehaviorSubject<String>("");

  getAllProduct(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(endPoint + '/admin/product/list');
  }

  getOtherProduct(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(endPoint + '/admin/product/phukienkhac');
  }

  getDetailProduct(id: string): Observable<Product>{
    return this.http.get<Product>(endPoint + '/admin/product/detail/' + id);
  }

  getAllProductSlug(slug: string | null){
    return this.http.get<Array<Product>>(endPoint + '/admin/product/slug/' + slug);
  }
}
