import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDataService } from 'src/app/services/login-data.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm !: FormGroup;
  submitted = false;
  responseDataSet: any;

  constructor(
    private formBuilder : FormBuilder,
    public loginData : LoginDataService,
    public router : Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username' : [null, [Validators.required, Validators.pattern("[a-zA-Z .]*")]]
    })
  }

  get validators() {
    return this.loginForm.controls;
  }

  submit() {
    this.submitted = true;
    if(this.loginForm.valid){
      this.loginData.loginData(this.loginForm.value).subscribe((responseData) => {
        // this.responseDataSet = responseData;
        let navigationExtras: NavigationExtras = {
          //HERE STATE IS A PROPERTY WHICH ATTACH THE DATA WITH THE NAVIGATION URL
          state : {
            customData : responseData
          }
        } 

        const response = JSON.stringify(responseData);
        const jsonResponse = JSON.parse(response);

        if(jsonResponse.success){
          console.log(navigationExtras);
          this.router.navigate(['/dashboard'], navigationExtras);
        } else {
          this.responseDataSet = responseData;
        }
      })
    }
    
  }

}
