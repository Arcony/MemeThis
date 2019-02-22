import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http'
 

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http: HttpClient) {

   }




  newMeme(content, postId, title, tag) {
    
    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    let testData: FormData = new FormData();
    testData.append('content', content );
    testData.append('postId', postId );
    testData.append('title', title );
    testData.append('tag', tag );

    return this.http.post('http://localhost:8080/newMeme',testData, {headers} );
  }


  getMemes (id) {
    return this.http.get('http://localhost:8080/allPostMemes/'+ id);
  }

  getMemesLikesAndComments (id) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));
    console.log("request is going")
    return this.http.get('http://localhost:8080/allMemesLikesComments/'+ id,  {headers});
  }
}
