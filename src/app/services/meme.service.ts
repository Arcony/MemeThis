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

  getMemesLikesAndComments (postId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/allMemesLikesComments/'+ postId,  {headers});
  }

  getMemesLikesAndCommentsForProfil (userId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/allMemesLikesCommentsForProfil/'+ userId,  {headers});
  }

  getMemesLikedForProfil (userId) {

    var headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+ localStorage.getItem('token'));

    return this.http.get('http://localhost:8080/allMemesLikedForProfil/'+ userId,  {headers});
  }
}
