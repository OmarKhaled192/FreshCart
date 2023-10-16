import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Cat } from '../Interfaces/cat';
import { CategoriesService } from '../Services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  allCats!: Cat[]
  constructor(private _CookieService:CookieService, private _CategoriesService:CategoriesService) {}
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/categories');
    this._CategoriesService.getAllCats().subscribe({
      next: (res) => {
        this.allCats = res.data;
        $('.loading').fadeOut(1000)
      },
      error: (err)=> {
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "categories is not successful ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0);
  }
}
