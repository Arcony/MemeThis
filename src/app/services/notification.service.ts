import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import { SERVER_API_URL } from './../app.constants';

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

  createNotificationForComment( userId , postId , commentId , memeId) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const notification =  {
      postId: postId,
      userId: userId,
      commentId : commentId,
      memeId : memeId,
      seen : false,
      type : 'comment'
    };
    return this.http.post(SERVER_API_URL + '/createNotificationComment', notification , {headers});
  }

  createNotificationForLike( userId , postId , commentId , memeId) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const notification =  {
      postId: postId,
      userId: userId,
      commentId : commentId,
      memeId : memeId,
      seen : false,
      type : 'like'
    };
    return this.http.post(SERVER_API_URL + '/createNotificationLike', notification , {headers});
  }

  unlikeNotificationUpdate(postId , memeId ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const notification =  {
      postId: postId,
      memeId : memeId,
      type : 'like'
    };
    return this.http.post(SERVER_API_URL + '/unlikeNotificationUpdate', notification , {headers});
  }

  getNotificationUser( userId ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(SERVER_API_URL + '/getNotificationUser/' + userId , {headers});
  }

  notificationClick( notificationId ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(SERVER_API_URL + '/ClickNotification/' + notificationId , null, {headers});
  }

  notificationSeeAll ( ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.put(SERVER_API_URL + '/seeNotification' , null, {headers});
  }
}
