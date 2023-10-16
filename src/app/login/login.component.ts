import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent {

  // loading
  loading!:boolean;
  forgetLoading!:boolean;
  codeLoading!:boolean;

  // errors
  errorBox!:any;
  errorMessage!:string;
  errorMessageModel!:string;

  // forms
  isCodeForm!:boolean;
  isNewPassWordForm!:boolean;
  isForgetForm!:boolean;

  // last buttom
  closeBtn!:any;

  constructor(private _AuthService:AuthService, private _Router:Router , private _CookieService: CookieService) {
       // loading buttons
      this.loading = false;
      this.forgetLoading = false;
      this.codeLoading = false
      // forms exists
      this.isForgetForm = true;
      this.isCodeForm = false;
      this.isNewPassWordForm = false;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    $('.loading').fadeOut(1000)

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('.loading').fadeIn(0)
  }
  // main login form
  loginForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
  });

  // forget form
  forgetForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  // code form
  codeForm : FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  // new password form
  newPasswordForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
  });


  // hide error box
  hideErrorBox() {
    this.errorBox = document.querySelector('.errorMsg') as HTMLElement;
        this.errorBox?.classList.remove('d-none')
        setTimeout(()=> {
          this.errorBox = document.querySelector('.errorMsg') as HTMLElement;
          this.errorBox?.classList.add('d-none')
         }, 3000);
  }
  // resetError
  resetError() {
    this.errorMessage = '';
    this.errorBox = document.querySelector('.errorMsg') as HTMLElement;
    this.errorBox?.classList.remove('d-none');
  }

  //================== all submit functions ============================
  // login submit
  loginSubmit(loginForm: FormGroup) {
    this.loading = true;
    this._AuthService.sendLogin(loginForm.value).subscribe({

      next: (res) => {
        // navigate to home
        this._Router.navigate(['/home']);
        this.loading = false;

        // save token
        this._CookieService.set('userToken', res.token, { expires: 1 });

        // save data based on token
        this._AuthService.saveData();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        this.loading = false;
        this.hideErrorBox();
      },
    })
  }

  // forget submit
  forgetSubmit(forgetForm: FormGroup) {
    // start loading;
    this.forgetLoading = true;
    this.errorMessageModel = '';
    this._AuthService.sendEmail(forgetForm.value).subscribe({

      next: (res) => {
        console.log(res);
        this.isForgetForm = false;
        this.isCodeForm = true;
        // stop loading;
        this.forgetLoading = false;

        this.errorMessageModel = '';
      },
      error: (err) => {
        console.error(err.error.message);
        this.errorMessageModel = err.error.message;
        // stop loading;
        this.forgetLoading = false;
        this.hideErrorBox()
      },
    })
  }

  // code submit
  codeSubmit(codeForm: FormGroup) {
     // start loading;
      this.codeLoading = true;
      this._AuthService.sendCode(codeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isCodeForm = false;
        this.isNewPassWordForm = true;
         // stop loading;
        this.codeLoading = false;
        this.errorMessageModel = '';
      },
      error: (err) => {
        console.error(err.error.message);
        this.errorMessageModel = err.error.message;
         // stop loading;
        this.codeLoading = false;
        this.hideErrorBox();
      },
    })
  }

  // new password submit
  newPasswordSubmit(newPasswordForm: FormGroup) {
    this.closeBtn = document.getElementById('closeBtn') as HTMLElement;
    this._AuthService.sendNewPassword(newPasswordForm.value).subscribe({

      next: (res) => {
        console.log(res);
        this.closeBtn.setAttribute('data-bs-dismiss', 'modal');
        this.closeBtn.click();
          // save token
        this._CookieService.set('userToken', res.token, { expires: 1 });
        // then check on token exists or not
        this._AuthService.saveData();
        this._Router.navigate(['/home']);
        this.errorMessageModel = '';
      },

      error: (err) => {
        console.error(err.error.message);
        this.errorMessageModel = err.error.message;
        this.hideErrorBox()
      },
    })
  }

}
