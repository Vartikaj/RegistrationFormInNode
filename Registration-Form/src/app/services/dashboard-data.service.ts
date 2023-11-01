import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  data:any;
  private url = 'http://localhost:3000/dashboard/'
  constructor(private httpClient : HttpClient) { }
  findData(data:any){
    console.log(data);
    return this.httpClient.post(this.url + 'findDataFromDatabase', data);
  }
}
