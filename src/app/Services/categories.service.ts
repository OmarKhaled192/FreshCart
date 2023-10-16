import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl: string = 'https://ecommerce.routemisr.com';
  private header!:any;

  constructor(private _HttpClient: HttpClient, private _CookieService:CookieService) { 
    this.header = {
      token: this._CookieService.get('userToken')
    }
  }

  getAllCats() :Observable<any>
  {
    return this._HttpClient.get(
      this.baseUrl.concat('/api/v1/categories'), {headers : this.header}) ;
  }

  


}
