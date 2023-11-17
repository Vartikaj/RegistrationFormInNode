import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardDataService{
  data:any;
  private url = 'http://localhost:3000/dashboard/'
  constructor(
    public httpClient : HttpClient
  ) { }

  findData(data:any){
    console.log("after login : " + data);
    return this.httpClient.get(this.url + 'findDataFromDatabase', data);
  }
}
