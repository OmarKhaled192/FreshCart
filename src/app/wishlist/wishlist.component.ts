import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  allProducts!: any;
  wishAdd!: boolean[];
  wishDel!: boolean[];
  wishlistCount!: number;

  constructor(private _CookieService:CookieService, public _WishlistService:WishlistService,
    private _CartService:CartService) {}
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/wishlist');
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        $('.loading').fadeOut(1000)
        this.wishlistCount = res.count;
        console.log(this.allProducts);
        this.wishAdd = new Array(this.allProducts.length);
        this.wishAdd.fill(false);
        this.wishDel = new Array(this.allProducts.length);
        this.wishDel.fill(false);
      },
      error: (err) => {
        console.error(err.error.message);
      }
    });

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0)
  }
  getAllWishlist() : void {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.wishlistCount = res.count;
      }
    })
  }

  deleteItemFromWish(pId:string, index:number): void {
    this.wishDel[index] = true;
    this._WishlistService.removeFromWishlist(pId).subscribe({
      next: (res) => {
        this.wishDel[index] = false;
        this.getAllWishlist();
        Swal.fire({
          title: 'Congrats!',
          text: 'product removed from wishlist successfully.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        console.log(res);
      },
      error: (err) => {
        this.wishDel[index] = false;

        Swal.fire({
          title: 'Sorry, server Error!',
          text: "product doesn't removed from wishlist !! ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }


  addCartClick(pId: string, index:number) : void {
    this.wishAdd[index] = true;
    this._CartService.addToCart(pId).subscribe({
      next: (res)=> {
        this.wishAdd[index] = false;
        Swal.fire({
          title: 'Congrats!',
          text: 'product added to cart successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(res);

      },
      error: (err)=> {
        this.wishAdd[index] = false;
        console.error(err.message);
      }
    })

  }

}

