import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }



  newComment(memeId, postId, text) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const comment =  {
      postId: postId,
      memeId: memeId,
      text: text
    };
    return this.http.post( SERVER_API_URL + '/newComment', comment, {headers} );
  }


  newCommentComment(memeId, postId, text, commentId) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const comment =  {
      postId: postId,
      memeId: memeId,
      text: text,
      commentId: commentId
    };
    return this.http.post( SERVER_API_URL + '/newCommentComment', comment, {headers} );
  }

  getMemeComments (memeId) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get( SERVER_API_URL + '/getAllMemeComments/' + memeId, {headers});
  }


}
