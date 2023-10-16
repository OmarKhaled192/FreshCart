import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl: string = 'https://ecommerce.routemisr.com';
  private header!:any;
  constructor(private _HttpClient:HttpClient, private _CookieService:CookieService) {
    this.header = {
      token: this._CookieService.get('userToken')
    }
  }
  payVisa(cId:string, formValue:any): Observable<any>
  {
    let body:any = {
      shippingAddress: formValue
    };

    return this._HttpClient.post(
      this.baseUrl.concat(`/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200`), body, {headers : this.header}) ;
  }
  payCash(cId:string, formValue:any): Observable<any>
  {
    let body:any = {
      shippingAddress: formValue
    };

    return this._HttpClient.post(
      this.baseUrl.concat(`/api/v1/orders/${cId}`), body, {headers : this.header}) ;
  }
}
