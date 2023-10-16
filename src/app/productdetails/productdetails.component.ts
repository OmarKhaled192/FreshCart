import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../Interfaces/product';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent {
  pid!:any;
  product!: Product;
  loadingAdd!:boolean;
  wishAdd!:boolean;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService:ProductsService,
    private _CartService:CartService, private _WishlistService:WishlistService) {}
  
  ngOnInit(): void {
    this.pid = this._ActivatedRoute.snapshot.params['pid'];
    this.loadingAdd = false;
    this.wishAdd = false;
    this._ProductsService.getProduct(this.pid).subscribe({
      next: (res) => {
        console.log(res.data);
        this.product = res.data;
        $('.loading').fadeOut(1000)
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0);
  }
  addCartClick(pId: string) : void {
    this.loadingAdd = true
    this._CartService.addToCart(pId).subscribe({
      next: (res)=> {
        this.loadingAdd = false;
        Swal.fire({
          title: 'Congrats!',
          text: 'product add from cart successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(res);

      },
      error: (err)=> {
        this.loadingAdd = false;
        console.error(err.message);
      }
    })

  }

  addItemToWish(pId:string): void {
    this._WishlistService.addToWishlist(pId).subscribe({
      next: (res) => {
        this.wishAdd = true;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  
  deleteItemFromWish(pId: string) {
    this._WishlistService.removeFromWishlist(pId).subscribe({
      next:(res)=> {
        console.log(res);
        this.wishAdd = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
