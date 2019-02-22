import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUser(id) {
    return this.http.get('http://localhost:8080/customer/'+ id);
  }

  getMyself() {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/getMyself/',{headers});
  }

  updateMyself( oldPassword, newPassword , content) {
    
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log()
    let testData: FormData = new FormData();
    if( newPassword && oldPassword && !content.get('picture')) {
      const data =  {
        newPassword: newPassword,
        oldPassword: oldPassword
      }
     return this.http.put('http://localhost:8080/updateMyselfPassword/',data,{headers});
    }
     else if( !newPassword && !oldPassword && content.get('picture')) {
      testData.append('picture', content.get('picture') );
     return this.http.put('http://localhost:8080/updateMyselfPicture/',testData,{headers});
     }
     else if( newPassword && oldPassword && content.get('picture')) {
      testData.append('picture', content.get('picture') );
      testData.append('newPassword', newPassword );
      testData.append('oldPassword', oldPassword );
     return this.http.put('http://localhost:8080/updateMyselfAll/',testData,{headers});
     }
  }
}
