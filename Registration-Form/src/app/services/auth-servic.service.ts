import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicService {

  constructor() { }

  storeToken(tokenValue: string){
    return localStorage.setItem('usertoken', tokenValue);
  }

  getToken(){
    return localStorage.getItem('usertoken');
  }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('usertoken');
  }
}
