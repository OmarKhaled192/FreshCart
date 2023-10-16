import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'https://ecommerce.routemisr.com';
  private header!:any;
  public cartCount !: BehaviorSubject<Number>;
  constructor(private _HttpClient:HttpClient, private _CookieService:CookieService) {
    this.header = {
      token: this._CookieService.get('userToken')
    }
    this.cartCount = new BehaviorSubject<Number>(0);
  }

  addToCart(pId: string) :Observable<any>
  {
    let body:any = {
      productId: pId
    };

    return this._HttpClient.post(
      this.baseUrl.concat('/api/v1/cart'), body, {headers : this.header}) ;
  }

  updateCart(pId: string, pCount: number) :Observable<any>
  {
    let body:any = {
      count:pCount
    };
    return this._HttpClient.put(
      this.baseUrl.concat('/api/v1/cart/').concat(pId), body, {headers : this.header}) ;
  }

  getAllCart() :Observable<any>
  {

    return this._HttpClient.get(
      this.baseUrl.concat('/api/v1/cart'), {headers : this.header}) ;
  }

  removeCart(pId: string) :Observable<any>
  {
    return this._HttpClient.delete(
      this.baseUrl.concat('/api/v1/cart/').concat(pId), {headers : this.header}) ;
  }

  clearCart() :Observable<any>
  {
    return this._HttpClient.delete(
      this.baseUrl.concat('/api/v1/cart'), {headers : this.header}) ;
  }



}
