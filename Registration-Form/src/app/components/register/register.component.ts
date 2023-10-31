import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm !: FormGroup;
  submitted = false;

  constructor(
    private formBuilder : FormBuilder,
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
  }

}
