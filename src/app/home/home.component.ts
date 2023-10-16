import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Product } from '../Interfaces/product';
import { CartService } from '../Services/cart.service';
import { WishlistService } from '../Services/wishlist.service';
import { ProductsService } from '../Services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allProducts!:Product[];
  wishProd!:any[];
  loadingAdd!:boolean[];
  wishAdd!:boolean[];
  index!:number;
  constructor(private _CookieService:CookieService, private _ProductsService:ProductsService,
     private _CartService:CartService, private _WishlistService:WishlistService) {
      
     }
  ngOnInit(): void {
    this._CookieService.set('currentPage', '/home');
    
    this._ProductsService.getAllProducts().subscribe({
      next: (res)=>{
        console.log('all data');
        $('.loading').fadeOut(1000)
        console.log(res.data);
        this.index = 0;
        this.allProducts = res.data;
        this.loadingAdd = new Array(this.allProducts.length);
        this.loadingAdd.fill(false);
        this.wishAdd = new Array(this.allProducts.length);
        this.wishAdd.fill(false);

        // first get all wish products
        this._WishlistService.getWishlist().subscribe({
          next:(res)=> {
            this.wishProd = res.data;
            this.allProducts.forEach((prod)=> {
              this.wishProd.forEach((wishProd)=> {
                if(prod._id == wishProd._id)  {
                  console.log(true)
                  this.wishAdd[this.index] = true;
                }
              })
              console.log(this.index);

              this.index ++;
            })
          }

        })
       

      },

      error: (err)=>{
        console.log(err);
        window.location.href = "/notfound";
        this._CookieService.set('currentPage', '/notfound');
      }
    })

  }
   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0)
  }
  addCartClick(pId: string, index:number) : void {
    this.loadingAdd[index] = true;
    this._CartService.addToCart(pId).subscribe({
      next: (res)=> {
        this.loadingAdd[index] = false;
        Swal.fire({
          title: 'Congrats!',
          text: 'product add to cart successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(res);

      },
      error: (err)=> {
        this.loadingAdd[index] = false;
        console.error(err.message);
      }
    })

  }

  deleteItemFromWish(pId:string, index:number): void {
    this._WishlistService.removeFromWishlist(pId).subscribe({
      next: (res) => {
        this.wishAdd[index] = false;

        console.log(res);
      },
      error: (err) => {
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "product doesn't removed from wishlist !! ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

  addItemToWish(pId:string, index:number): void {
    this._WishlistService.addToWishlist(pId).subscribe({
      next: (res) => {
        console.log(res);
      this.wishAdd[index] = true;
      },
      error: (err) => {
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "product doesn't added to wishlist !! ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    })
  }
}
