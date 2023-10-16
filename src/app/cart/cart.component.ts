
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  allProducts!: any;
  loadingDel!: boolean[];
  loadCount!:boolean[];
  clearCartLoad!:boolean;
  totalPrice!:number;
  cartId!:string;

  constructor(private _CookieService:CookieService, public _CartService:CartService) {}
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/cart');
    
    this._CartService.getAllCart().subscribe({
      next: (res) => {
        this.allProducts = res.data.products;
        console.log(this.allProducts);
        $('.loading').fadeOut(1000)
        this.loadingDel = new Array(this.allProducts.length)
        this.loadingDel.fill(false);
        this.loadCount = new Array(this.allProducts.length)
        this.loadCount.fill(false);
        console.log(this.loadingDel);
        this._CartService.cartCount.next(res.numOfCartItems);
        this.totalPrice = res.data.totalCartPrice
        this.clearCartLoad = false;
        this.cartId = res.data._id;
      },
      error: (err) => {
        console.error(err.error.message);
        $('.loading').fadeOut(1000);
          Swal.fire({
          title: 'Sorry, server Error!',
          text: "no item is found",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0)
  }
  deleteItemClick(pId:string, index:number): void {
    this.loadingDel[index] = true
    this._CartService.removeCart(pId).subscribe({
      next: (res) => {
        this.allProducts = res.data.products;
        this.loadingDel[index] = false;
        this.loadCount[index] = false;
        console.log(`loadingDel[index] : ${this.loadingDel[index]}`);
        Swal.fire({
          title: 'Congrats!',
          text: 'product removed from cart successfully.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(res);

      },
      error: (err) => {
        this.loadingDel[index] = false;
        this.loadCount[index] = false;
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "product doesn't removed from cart !! ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }
  removeAll() {
    $('.loading').fadeIn(0);
    this._CartService.clearCart().subscribe({
      next: (res)=> {
        console.log(res);
        $('.loading').fadeOut(1000)
        this._CartService.cartCount.next(0);
      },
      error: (err) => {
        this.clearCartLoad = false;
        $('.loading').fadeOut(1000)
        Swal.fire({
          title: 'Sorry, server Error!',
          text: 'Your Cart not Cleared successfully',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);

      }
    })
  }
  updateCount( pId:string , count:number, index:number) {
    this.loadCount[index] = true;
    if(count <= 0) {
      this.deleteItemClick(pId, index); // deleting an item
      return;
    }
    this._CartService.updateCart(pId, count).subscribe({
      next: (res)=> {
        this.allProducts = res.data.products;
        this.loadCount[index] = false;
        this._CartService.cartCount.next(res.numOfCartItems);

      },
      error: (err) => {
        this.loadCount[index] = false;
        Swal.fire({
          title: 'Sorry, server Error!',
          text: 'product doesnt updated successfully',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(err);

      }
    })
  }
}