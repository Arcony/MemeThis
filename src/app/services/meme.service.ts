import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { SERVER_API_URL } from './../app.constants';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http: HttpClient) {

   }

  newMeme(content, postId, title, tag) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    const testData: FormData = new FormData();
    testData.append('content', content );
    testData.append('postId', postId );
    testData.append('title', title );
    testData.append('tag', tag );

    return this.http.post(SERVER_API_URL + '/newMeme', testData, {headers} );
  }


  getMemes (id) {
    return this.http.get(SERVER_API_URL + '/allPostMemes/' + id);
  }

  getMeme (memeId) {
    return this.http.get(SERVER_API_URL + '/meme/' + memeId);
  }

  getMemesLikesAndComments (postId) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get(SERVER_API_URL + '/allMemesLikesComments/' + postId,  {headers});
  }

  getMemesLikesAndCommentsForProfil (userId) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get(SERVER_API_URL + '/allMemesLikesCommentsForProfil/' + userId,  {headers});
  }

  getMemesLikedForProfil (userId) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));

    return this.http.get(SERVER_API_URL + '/allMemesLikedForProfil/' + userId,  {headers});
  }
}
