import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient) { }
  
  getAllProducts() :Observable<any> 
  {
    return this._HttpClient.get(this.baseUrl.concat('/api/v1/products'));
  }
  getProduct(pId: string) :Observable<any> 
  {
    return this._HttpClient.get(this.baseUrl.concat('/api/v1/products/').concat(pId));
  }
}
