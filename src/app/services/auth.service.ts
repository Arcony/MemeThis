import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Method to Login
  login (username, password) {

    const user =  {
      username: username,
      password: password,
    };
    return this.http.post( SERVER_API_URL + '/login', user);
  }

  // Method to set Token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Method if is logged
  isLogged() {
    return localStorage.getItem('token') != null;
  }


  // Method to register
  register(email, password, username) {

    if ( !email || !password || !username) {
      return null;
    }
    const user =  {
      email: email,
      username: username,
      password: password,
      picture: ''
    };

    return this.http.post( SERVER_API_URL + '/customer', user);
  }

}


