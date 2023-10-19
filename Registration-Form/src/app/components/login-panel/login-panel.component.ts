import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss']
})
export class LoginPanelComponent implements OnInit {
  
  contactForm !: FormGroup;
  addressForm: any;
  submitted = false;

  constructor(
    private formBuilder : FormBuilder
    ){}

  ngOnInit() {

    this.addressForm = this.formBuilder.group({
      'streetAddress' : [null, [Validators.required, Validators.maxLength(50)]],
      'city': [null, [Validators.required, Validators.maxLength(20)]],
      'state' : [null, [Validators.required, Validators.maxLength(20)]],
      'postalCode': [null, [Validators.required, Validators.maxLength(20), Validators.pattern("^[0-9]*$")]]
    }),
    
    this.contactForm = this.formBuilder.group({
      'firstName' : [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
      'lastName' : [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
      'userName' : [null, [Validators.required, Validators.pattern('[a-zA-Z .]*')]],
      'admissionNumber' : [null, [Validators.required, Validators.pattern('[a-zA-Z0-9 .]*')]],
      // 'email' : [null, [Validators.required, Validators.email]],
      'phone': [null, Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")],
      'address' : this.addressForm,
    })
  }

  /**
   * THIS FUNCTION IS USED TO APPLY VALIDATION
   */
  get validations() { return this.contactForm.controls; }
  get addressValidations() { return this.addressForm.controls; }

  submit(){
    this.submitted = true;
  }
  
}
