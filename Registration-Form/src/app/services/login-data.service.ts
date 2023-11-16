import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  data : any;
  private url = 'http://localhost:3000/login/'
  constructor(public httpClient : HttpClient) {}

  loginData(data : any){
    console.log("Login Data : " + data);
    return this.httpClient.post(this.url + 'postLoginData', data);

  }




}
