import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryListService } from 'src/app/services/country-list.service';
import { RegistrationDataService } from 'src/app/services/registration-data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
    public toastrService: ToastrService,
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
        'firstName': ['', [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
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

  get childFormControls() {
    return (this.contactForm.get('addressForm') as FormGroup).controls;
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
        if (res.mesgcode == 1) {
          this.toastrService.success('Message Success!', res.mesgtext)
        }
        if(res.mesgcode == 4 && res.mesgcode == 5){
          this.toastrService.warning('Message Warning!', res.mesgtext);
        }
      } else {
        if(res.mesgcode == 0){
          this.toastrService.error('Message Error!', res.mesgtext);
        }
      }
    });
  }
}
