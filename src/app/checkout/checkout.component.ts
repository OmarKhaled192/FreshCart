import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CheckoutService } from '../Services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cId!: string; 
  checkOutForm:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  })
  constructor(private _ActivatedRoute: ActivatedRoute,
     private _CheckoutService:CheckoutService){}
  ngOnInit(): void {
    $('.loading').fadeOut(1000);
    this.cId = this._ActivatedRoute.snapshot.params['cId'];
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0);
    
  }
  payVisaSubmit(vForm: FormGroup){
    this._CheckoutService.payVisa(this.cId, vForm.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url;
      },
      error: (err) => {
        Swal.fire({
          title: 'Sorry, server Error!',
          text: "payment proceess is not successful ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        

      },
    })
  }
  payCashSubmit(vForm: FormGroup){
    this._CheckoutService.payCash(this.cId, vForm.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = "/";
      },
      error: (err) => {
        console.log(err);
          Swal.fire({
          title: 'Sorry, server Error!',
          text: "payment proceess is not successful ",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      },
    })
  }
}
