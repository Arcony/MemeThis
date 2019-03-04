import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
 

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  createNotification( userId , postId ,commentId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log("test");

    if( !postId || !userId ) {

    }

    const notification =  {
      postId: postId,
      userId: userId,
      commentId : commentId,
      seen : false,
    }
    console.log(notification)
    return this.http.post('http://localhost:8080/createNotification',notification ,{headers});    
  }
}
