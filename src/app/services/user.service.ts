import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signIn } from '../models/SignIn';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://142.93.6.205:4001/user/session';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };


  constructor(
    private http: HttpClient
  ) { }

  public signIn(signIn: signIn){
    console.log(`user: ${JSON.stringify(signIn)}`);
    return this.http.post(`${this.apiUrl}`,signIn)
  }
  public signUp(signUp: User){
    console.log(`user: ${JSON.stringify(signUp)}`);
    return this.http.post(`http://142.93.6.205:4001/user/`,signUp)
  }

}
