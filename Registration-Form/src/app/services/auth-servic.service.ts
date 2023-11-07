import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServicService {

  constructor() { }

  storeToken(tokenValue: string){
    return localStorage.setItem('token', tokenValue);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn() : boolean {
    return !!localStorage.getItem('token')
  }
}
