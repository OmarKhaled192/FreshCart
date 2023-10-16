import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { Ireg } from '../Interfaces/ireg';
import { Ilog } from '../Interfaces/ilog';
import { InewPass } from '../Interfaces/inew-pass';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl : string = "https://ecommerce.routemisr.com";
  userDataSharedVar!: any;

  constructor(private _HttpClient: HttpClient, private _CookieService: CookieService, private _Router:Router) {
    this.userDataSharedVar = new BehaviorSubject<any>(null);
    if(!this._CookieService.check('userToken')) {
      this._Router.navigate(['/login']);
      
    } else {
      this.saveData();
      this._Router.navigate([this._CookieService.get('currentPage')]);
    }

  }

  sendRegister(registerData: Ireg) :Observable<any> {
    return this._HttpClient.post(this.baseUrl.concat('/api/v1/auth/signup'), registerData);
  }

  sendLogin(loginData: Ilog) :Observable<any> {
    return this._HttpClient.post(this.baseUrl.concat('/api/v1/auth/signin'), loginData);
  }

  sendEmail(forgetData: any) :Observable<any> {
    return this._HttpClient.post(this.baseUrl.concat('/api/v1/auth/forgotPasswords'), forgetData);
  }
  sendCode(codeData: any) :Observable<any> {
    return this._HttpClient.post(this.baseUrl.concat('/api/v1/auth/verifyResetCode'), codeData);
  }
  sendNewPassword(resetPasswordData: InewPass) :Observable<any> {
    return this._HttpClient.put(this.baseUrl.concat('/api/v1/auth/resetPassword'), resetPasswordData);
  }
  saveData() {
    this.userDataSharedVar.next( this._CookieService.get('userToken') );
    if(this.userDataSharedVar) {
      this.userDataSharedVar.next( jwtDecode(this.userDataSharedVar.getValue()) ) ;
    } else {
      this.userDataSharedVar.next(null);
    }
  }
}
