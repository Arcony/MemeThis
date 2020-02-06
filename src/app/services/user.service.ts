import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUser(id) {
    return this.http.get(SERVER_API_URL + '/customer/' + id);
  }

  getMyself() {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get(SERVER_API_URL + '/getMyself/', {headers});
  }

  updateMyself( oldPassword, newPassword , content) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const testData: FormData = new FormData();
    if ( newPassword && oldPassword && !content.get('picture')) {
      const data =  {
        newPassword: newPassword,
        oldPassword: oldPassword
      };
     return this.http.put(SERVER_API_URL + '/updateMyselfPassword/', data, {headers});
    } else if ( !newPassword && !oldPassword && content.get('picture')) {
      testData.append('picture', content.get('picture') );
     return this.http.put(SERVER_API_URL + '/updateMyselfPicture/', testData, {headers});
     } else if ( newPassword && oldPassword && content.get('picture')) {
      testData.append('picture', content.get('picture') );
      testData.append('newPassword', newPassword );
      testData.append('oldPassword', oldPassword );
     return this.http.put(SERVER_API_URL + '/updateMyselfAll/', testData, {headers});
     }
  }
}
