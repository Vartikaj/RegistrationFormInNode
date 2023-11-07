import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryListService } from 'src/app/services/country-list.service';
import { RegistrationDataService } from 'src/app/services/registration-data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  contactForm !: FormGroup;
  addressForm: any;
  submitted = false;
  responseDataValue: any;
  successMessage : any;
  successCode : any;
  /**
   * DATA COME FROM NODE IN THE FORM OF OBJECT,
   * THEN WE HAVE TO CONVERT IT INTO THE ARRAY FORMAT.
   */
  countryData: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private serviceCountry: CountryListService,
    private srvlogin: RegistrationDataService,
  ) { }

  ngOnInit() {

    this.addressForm = this.formBuilder.group({
      'streetAddress': [null, [Validators.required, Validators.maxLength(50)]],
      'city': [null, [Validators.required, Validators.maxLength(20)]],
      'state': [null, [Validators.required, Validators.maxLength(20)]],
      'country': [null, [Validators.required, Validators.maxLength(50)]],
      'postalCode': [null, [Validators.required, Validators.maxLength(20), Validators.pattern("^[0-9]*$")]]
    }),

      this.contactForm = this.formBuilder.group({
        'firstName': [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
        'lastName': [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
        'username': [null, [Validators.required, Validators.pattern('[a-zA-Z0-9 .]*')]],
        'password': [null, [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).+$/)]],
        'addmissionno': [null, [Validators.required, Validators.pattern('[0-9 .]*')]],
        // 'email' : [null, [Validators.required, Validators.email]],
        //'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
        'address': this.addressForm,
      })

    this.serviceCountry.getCountryData().subscribe((response) => {
      this.countryData = response;
    })
  }

  /**
   * THIS FUNCTION IS USED TO APPLY VALIDATION
   */
  get validations() {
    return this.contactForm.controls;
  }
  get addressValidations() { return this.addressForm.controls; }

  submit() {
    this.submitted = true;
    this.srvlogin.userlogin(this.contactForm.value).subscribe((res: any) => {
      if (res.success) {
        if (res.msgCode == 1) {
          this.responseDataValue = res;
          /////////////////////////////////////////sucee
          this.successMessage = 'User successfully login!!!';
          this.successCode = 1;
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

    });
  }
}
