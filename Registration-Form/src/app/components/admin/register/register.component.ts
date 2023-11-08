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
    // this.toastrService.warning('Message Warning!', 'Title Warning!');
    this.loginForm = this.formBuilder.group({
      'username' : [null, [Validators.required, Validators.pattern("[a-zA-Z0-9 .]*")]],
      'password' : [null, [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/)]]
    })
  }

  // openWarning(){
    
  // }

  

  // openError(){
    
  // }

  // openInfo (){
  //   this.toastrService.error('Message Error!', 'Title Error!');
  // }



  get validators() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this.loginData.loginData(this.loginForm.value).subscribe((res : any) => {
        if(res.success){
          if (res.mesgcode == 1) {
            let navigationExtras: NavigationExtras = {
              //HERE STATE IS A PROPERTY WHICH ATTACH THE DATA WITH THE NAVIGATION URL
              state : {
                customData : res
              }
            }
            this.toastrService.success('Message Success!', res.message)
            this.router.navigate(['/dashboard'], navigationExtras);

            // this.toastrService.success('Message Success!', res.message)
            // this.router.navigate(['/dashboard']);
            
          } else {
            this.toastrService.warning('Message Warning!', res.message);
          }
        } else {
          if (res.mesgcode == 2) {
            this.toastrService.error('Message Error!', res.message);
          }
        }
      })
    }
  }

}
