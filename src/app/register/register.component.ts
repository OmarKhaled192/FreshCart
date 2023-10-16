import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage!:string;
  loading!:boolean;
  errorBox!:any;

  constructor(private _AuthService:AuthService, private _Router:Router) {
    this.loading = false;
  }
  registerForm : FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(10), Validators.max(150)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
  }, this.passwordMatchValidator);

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
  registerSubmit(rForm: FormGroup) {
    this.loading = true;
    this._AuthService.sendRegister(rForm.value).subscribe({

      next: res => {
        // console.log(res);
        this._Router.navigate(['/login']);
        this.loading = false;
        console.log(res);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.loading = false;
        // check if my error box is shown before this time ; then already exists in my document;
        // then we need to remove it before we hide it after specific time
        this.errorBox = document.querySelector('.errorMsg') as HTMLElement;
        this.errorBox?.classList.remove('d-none')
        setTimeout(()=> {
          this.errorBox = document.querySelector('.errorMsg') as HTMLElement;
          this.errorBox?.classList.add('d-none')
         }, 3000);
         console.log(err)
      },

    })
  }
  
  passwordMatchValidator(g: any) {
    return g.get('password').value === g.get('rePassword').value? null : {'mismatch': true};
  }


}
