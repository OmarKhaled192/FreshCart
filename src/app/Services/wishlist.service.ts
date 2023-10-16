import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  header!:any;
  private baseUrl: string = 'https://ecommerce.routemisr.com';
  constructor(private _HttpClient:HttpClient, private _CookieService:CookieService) {
    this.header = {
      token: this._CookieService.get('userToken')
    }
  }

  getWishlist() :Observable<any>
  {
    return this._HttpClient.get(this.baseUrl.concat('/api/v1/wishlist'), {headers : this.header});
  }

  addToWishlist(pId: string) :Observable<any> {
    let body = {
      productId: pId
    }
    return this._HttpClient.post(this.baseUrl.concat('/api/v1/wishlist'), body, {headers : this.header});
  }

  removeFromWishlist(pId: string)  :Observable<any> {
    return this._HttpClient.delete(this.baseUrl.concat('/api/v1/wishlist/').concat(pId), {headers : this.header});
  }

}
