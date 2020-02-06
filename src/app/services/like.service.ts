import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  newLike(memeId, postId, commentId) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const like =  {
      postId: postId,
      memeId: memeId,
      commentId: commentId
    };
    return this.http.post( SERVER_API_URL + '/newLike', like, {headers} );
  }


  dislike(memeId, postId, commentId) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const like =  {
      postId: postId,
      memeId: memeId,
      commentId: commentId
    };
    return this.http.post( SERVER_API_URL + '/dislike', like, {headers} );
  }



}
