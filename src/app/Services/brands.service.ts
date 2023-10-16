import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private baseUrl: string = 'https://ecommerce.routemisr.com';
  private header!:any;

  constructor(private _HttpClient: HttpClient, private _CookieService:CookieService) { 
    this.header = {
      token: this._CookieService.get('userToken')
    }
  }

  getAllBrands() :Observable<any>
  {
    return this._HttpClient.get(
      this.baseUrl.concat('/api/v1/brands'), {headers : this.header}) ;
  }

  

}
