import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:"", redirectTo: "login", pathMatch:"full"},

  {path:"home",canActivate:[authGuard] ,component: HomeComponent, title:'home page'},
  {path:"products",canActivate:[authGuard] ,component: ProductsComponent, title:'all products'},
  {path:"wishlist",canActivate:[authGuard] ,component: WishlistComponent, title: 'your wishlists'},
  {path:"cart", canActivate:[authGuard] ,component: CartComponent, title:'your cart'},
  {path:"checkout/:cId", canActivate:[authGuard] ,component: CheckoutComponent, title:'your checkout'},
  {path:"categories",canActivate:[authGuard] ,component: CategoriesComponent, title:'all categories'},
  {path:"brands", canActivate:[authGuard] ,component: BrandsComponent, title:'all brands'},
  
  {path:"productDetails/:pid",canActivate:[authGuard] ,component: ProductdetailsComponent, title: 'details'},
  
  {path:"register", component: RegisterComponent, title: 'register'},
  {path:"login", component: LoginComponent, title:'login'},

  {path:"**", component: NotfoundComponent, title:'not found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
