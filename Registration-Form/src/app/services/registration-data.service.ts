import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {
  data:any;
  private url = 'http://localhost:3000/registrationForm/';
  constructor(public httpClient : HttpClient) { }
  userlogin(data : any){
    console.log(data);
    return this.httpClient.post(this.url + 'postRegistrationData', data);
  }
}
