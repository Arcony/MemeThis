import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPosts () {
    return this.http.get(SERVER_API_URL + '/allPost');
  }

  getPostsAndMemes () {
    return this.http.get(SERVER_API_URL + '/allPostMemes');
  }

  getPostsAndMemesHot () {
    return this.http.get(SERVER_API_URL + '/memesHot');
  }

  getPostsAndMemesBest () {
    return this.http.get(SERVER_API_URL + '/memesBest');
  }

  getPostsAndMemesForProfil (id) {
    return this.http.get(SERVER_API_URL + '/allPostMemesForProfil/' + id);
  }

  getPost (id) {
    return this.http.get(SERVER_API_URL + '/post/' + id);
  }

  createPost (title, tag, content) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const testData: FormData = new FormData();
    testData.append('content', content.get('content') );
    testData.append('title', title );
    testData.append('tag', tag );
    return this.http.post(SERVER_API_URL + '/newpost/', testData, {headers} );
  }

  countPostMemes (postId) {
    return this.http.get(SERVER_API_URL + '/countPostMemes/' + postId);
  }

}
