import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import *  as $ from 'jquery'
import Swal from 'sweetalert2';
import { Brand } from '../Interfaces/brand';
import { BrandsService } from '../Services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  allBrands!:Brand[];

  constructor(private _CookieService:CookieService, private _BrandsService:BrandsService) {}
    ngOnInit(): void {
    this._CookieService.set('currentPage', '/brands');
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        $('.loading').fadeOut(1000)

        this.allBrands = res.data;
      },
      error: (err) => {
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "no brands is found ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }
    ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0)
  }
 
}
