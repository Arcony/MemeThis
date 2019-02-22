import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
 
@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  newLike(memeId, postId, commentId) {
    console.log("LIKE START HERE ////")

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !postId || !memeId ) {
    }
    const like =  {
      postId: postId,
      memeId: memeId,
      commentId: commentId
    }
    return this.http.post('http://localhost:8080/newLike',like, {headers} );
  }


  dislike(memeId, postId, commentId) {
    console.log("DISLIKE START HERE ////")
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !postId || !memeId ) {
    }
    const like =  {
      postId: postId,
      memeId: memeId,
      commentId: commentId
    }
    return this.http.post('http://localhost:8080/dislike',like, {headers} );
  }



}
