import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryListService {

  //THIS FOR CONNECT WITH NODE API's
  private url = 'http://localhost:3000/'
  constructor(private http : HttpClient) { }

  getCountryData() { 
    // countryCode/getInsertData
    return this.http.get(this.url + 'countryCode/getListOfData');
  }
}
