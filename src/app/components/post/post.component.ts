import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { MemeService } from 'src/app/services/meme.service';
import { LikeService } from 'src/app/services/like.service';
import { NotificationService } from 'src/app/services/notification.service';

import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';
import { Meme } from '../../models/meme.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  memes : Meme[];
  post : Post;
  postId : string;
  postContent : string;
  message:string;
  that = this;
  meme : Meme;

  constructor(private router: Router, private notificationService: NotificationService, private likeService: LikeService, private postService: PostService, private memeService: MemeService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPost(id);
    this.postId = id;
    this.fetchMemesLikesAndComments(this.postId);
  }

  fetchPost(id) {
    this.postService
    .getPost(id)
    .subscribe((data: Post ) => {
        this.post = data; 
        this.postContent = data.content;     
    }); 
  }

  fetchMemes(id) {
    this.memeService
    .getMemes(id)
    .subscribe((data: Meme[] ) => {
        this.memes = data;
    });
  }


  fetchMemesLikesAndComments(id) {
    console.log("Begin FETCH");
    this.memeService
    .getMemesLikesAndComments(id)
    .subscribe((data: Meme[] ) => {
        console.log("DATA BEFORE FETCH" ,this.memes)
        this.memes = data;
        console.log("DATA AFTER FETCH" ,this.memes)
    });
  }

  receiveMessage($event) {
    this.fetchMemesLikesAndComments($event);
  }

  newLikeMeme(memeId,postId,commentId) {
    console.log("like call");
    this.likeService
    .newLike(memeId,postId,commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        console.log(data.userId)
        this.notificationService.createNotificationForLike(data.userId , postId, data._id , memeId)
        .subscribe((data: Notification) => {
          console.log(data);
        })
        this.that.fetchMemesLikesAndComments(postId);
    });
  }

  dislikeMeme(memeId,postId,commentId) {
    console.log("dislike call",memeId,postId,commentId);
    this.likeService
    .dislike(memeId,postId,commentId)
    .subscribe((data: Meme ) => {
        console.log(postId , memeId , commentId)
        this.notificationService.unlikeNotificationUpdate(postId , memeId)
        .subscribe((data: Notification) => {
          console.log(data);
        })
        this.fetchMemesLikesAndComments(postId);
    });
  }

  
  
}
