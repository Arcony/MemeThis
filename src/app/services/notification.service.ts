import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  private navStateSource = new Subject<string>();
  private memeStateSource = new Subject<string>();

  navState$ = this.navStateSource.asObservable();
  MemeState$ = this.memeStateSource.asObservable();



refreshNavbar( state: string ) {
  this.navStateSource.next( state );
}

refreshMeme( state: string ) {
  this.memeStateSource.next( state );
}

  createNotificationForComment( userId , postId ,commentId , memeId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log("test");

    if( !postId || !userId ) {

    }
    const notification =  {
      postId: postId,
      userId: userId,
      commentId : commentId,
      memeId : memeId,
      seen : false,
      type : "comment"
    }
    console.log(notification)
    return this.http.post('http://localhost:8080/createNotificationComment',notification ,{headers});    
  }

  createNotificationForLike( userId , postId ,commentId , memeId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log("test");

    if( !postId || !userId ) {

    }
    const notification =  {
      postId: postId,
      userId: userId,
      commentId : commentId,
      memeId : memeId,
      seen : false,
      type : "like"
    }
    console.log(notification)
    return this.http.post('http://localhost:8080/createNotificationLike',notification ,{headers});    
  }

  unlikeNotificationUpdate(postId , memeId ) {
    console.log("ENTER HERE", postId , memeId)
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log("test");

    const notification =  {
      postId: postId,
      memeId : memeId,
      type : "like"
    }
    console.log('UNLIKE CALL COTE FRONT',notification)
    return this.http.post('http://localhost:8080/unlikeNotificationUpdate',notification ,{headers}); 
  }

  getNotificationUser( userId ) {
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !userId ) {
    }
    console.log(userId);
    return this.http.get('http://localhost:8080/getNotificationUser/'+userId ,{headers});  
  }

  notificationClick( notificationId ) { 

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    if( !notificationId ) {
    }

    return this.http.put('http://localhost:8080/ClickNotification/'+notificationId ,null,{headers});
  }

  notificationSeeAll ( ) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.put('http://localhost:8080/seeNotification' ,null,{headers});
  }
}
