import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPosts () {
    return this.http.get('http://localhost:8080/allPost');
  }

  getPostsAndMemes () {
    return this.http.get('http://localhost:8080/allPostMemes');
  }

  getPostsAndMemesHot () {
    return this.http.get('http://localhost:8080/memesHot');
  }

  getPostsAndMemesBest () {
    return this.http.get('http://localhost:8080/memesBest');
  }

  getPostsAndMemesForProfil (id) {
    return this.http.get('http://localhost:8080/allPostMemesForProfil/' + id);
  }

  getPost (id) {
    return this.http.get('http://localhost:8080/post/' + id);
  }

  createPost (title, tag, content) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const testData: FormData = new FormData();
    testData.append('content', content.get('content') );
    testData.append('title', title );
    testData.append('tag', tag );
    return this.http.post('http://localhost:8080/newpost/', testData, {headers} );
  }

  countPostMemes (postId) {
    return this.http.get('http://localhost:8080/countPostMemes/' + postId);
  }

}
