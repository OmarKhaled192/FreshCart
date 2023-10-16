import { Component} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})


export class NavbarComponent {
  isLogin : boolean = false ;
  userName!: string;
  constructor(private _AuthService:AuthService ,
    private _CookieService:CookieService,
    private _Router:Router, public _CartService:CartService ) {}
  ngOnInit(): void {
    this._AuthService.userDataSharedVar.subscribe(()=> {
      if(this._AuthService.userDataSharedVar.getValue() ) {
          this.isLogin = true;
          this.userName = this._AuthService.userDataSharedVar._value.name;
          this._CartService.getAllCart().subscribe({
            next: (res)=> {
              this._CartService.cartCount.next(res.numOfCartItems);
            }
          })
      } else {
        this.isLogin = false;
      }
    })
  }

  logout(): void {
    // 1. remove the token
    // 2. call save data simultansously
    // 3. login
    this._CookieService.delete('userToken');
    this._Router.navigate(["/login"]);
    this._AuthService.saveData();
  }
}
