import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Address } from '../models/Address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  apiUrl = 'http://142.93.6.205:4001';
  login: any = localStorage.getItem('login')
  tokenJWT = JSON.parse(this.login)
  access_token: any = this.tokenJWT.access_token;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${this.access_token}`,
    })
  };

  constructor(
    private http: HttpClient

  ) { }

  public getAddress(){
    console.log(`token: ${this.access_token}`);
    return this.http.get(`${this.apiUrl}/address`, this.httpOptions)
  }

  public postAddress(address: Address){
    console.log(`token: ${this.access_token}`);
    return this.http.post(`${this.apiUrl}/address`,address, this.httpOptions)
  }
}
