import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDataService } from 'src/app/services/login-data.service';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServicService } from 'src/app/services/auth-servic.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm !: FormGroup;
  submitted = false;
  responseDataSet: any;
  successMessage:any;
  successCode:any;
  responseDataValue: any;


  constructor(
    private formBuilder : FormBuilder,
    public loginData : LoginDataService,
    public router : Router,
    public authService : AuthServicService,
    public toastrService: ToastrService,

  ) { }

  ngOnInit() {
    this.toastrService.warning('Message Warning!', 'Title Warning!');
    this.loginForm = this.formBuilder.group({
      'username' : [null, [Validators.required, Validators.pattern("[a-zA-Z0-9 .]*")]],
      'password' : [null, [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/)]]
    })
  }

  openWarning(){
    this.toastrService.warning('Message Warning!', 'Title Warning!');
  }

  openSuccess(){
    this.toastrService.success('Message Success!', 'Title Success!');
  
  }

  openError(){
    this.toastrService.error('Message Error!', 'Title Error!');
  }

  openInfo (){
    this.toastrService.error('Message Error!', 'Title Error!');
  }



  get validators() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this.loginData.loginData(this.loginForm.value).subscribe((res : any) => {

        if (res.success) {
          if (res.msgCode == 1) {
            this.responseDataValue = res;
            /////////////////////////////////////////sucee
            this.successMessage = 'User successfully login!!!';
        
            // let navigationExtras: NavigationExtras = {
            //   //HERE STATE IS A PROPERTY WHICH ATTACH THE DATA WITH THE NAVIGATION URL
            //   state : {
            //     customData : res
            //   }
            // }

            const response = JSON.stringify(res);
            const jsonResponse = JSON.parse(response);
            if(jsonResponse.success){
              this.authService.storeToken(jsonResponse.token);
              // console.log("navigationExtras : " + navigationExtras);
              // this.router.navigate(['/dashboard'], navigationExtras);
              this.router.navigate(['/dashboard']);
            } else {
              this.responseDataSet = res;
            }
          } else {
            /////////////////////////////////error api message
            this.successMessage = 'Their is some error';
            this.successCode = 2;
          }
        } else {
          ////////////////////////////////////////////error serfver message
          this.successMessage = 'Server error, Try after sometime';
            this.successCode = 3;
        }
        
      })
    }
  }

}
