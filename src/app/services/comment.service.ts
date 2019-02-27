import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
 
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }



  newComment(memeId, postId, text) {
    console.log("LIKE START HERE ////")

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !postId || !memeId || text) {
    }
    const comment =  {
      postId: postId,
      memeId: memeId,
      text: text
    }
    return this.http.post('http://localhost:8080/newComment',comment, {headers} );
  }


  newCommentComment(memeId, postId, text, commentId) {
    console.log("LIKE START HERE ////")

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !postId || !memeId || text) {
    }
    const comment =  {
      postId: postId,
      memeId: memeId,
      text: text,
      commentId: commentId
    }
    return this.http.post('http://localhost:8080/newCommentComment',comment, {headers} );
  }

  getMemeComments (memeId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/getAllMemeComments/'+memeId);
  }


}
