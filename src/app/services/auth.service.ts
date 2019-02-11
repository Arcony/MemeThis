import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  //Method to Login
  login (email, password) {

    const user =  {
      email: email,
      password: password,
    }
    return this.http.post('http://localhost:8080/login',user);
  }

  //Method to set Token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  //Method if is logged
  isLogged() {
    return localStorage.getItem('token') != null;
  }


  //Method to register
  register(email,password,username) {

    if( !email || !password || !username)
    {
      return null;
    }
    const user =  {
      email: email,
      username: username,
      password: password,
      picture: ''
    }

    return this.http.post('http://localhost:8080/customer',user);
  }

}


