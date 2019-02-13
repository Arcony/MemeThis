import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
 

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPosts () {
    return this.http.get('http://localhost:8080/allPost');
  }

  getPost (id) {
    return this.http.get('http://localhost:8080/post/'+ id);
  }

}
