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
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  memes: Meme[];
  post: Post;
  postId: string;
  postContent: string;
  message: string;
  that = this;
  meme: Meme;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private componentCommunicationService: ComponentCommunicationService,
    private likeService: LikeService,
    private postService: PostService,
    private memeService: MemeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchPost(id);
    this.postId = id;
    this.fetchMemesLikesAndComments(this.postId);
    this.componentCommunicationService.updateMemes.subscribe((refresh: boolean) => this.fetchMemesLikesAndComments(this.postId));
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
    this.memeService
    .getMemesLikesAndComments(id)
    .subscribe((data: Meme[] ) => {
        this.memes = data;
    });
  }

  receiveMessage($event) {
    this.fetchMemesLikesAndComments($event);
  }

  newLikeMeme(memeId, postId, commentId) {
    this.likeService
    .newLike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.meme = data;
        this.notificationService.createNotificationForLike(data.userId , postId, data._id , memeId)
        .subscribe((retour: Notification) => {
          console.log(retour);
        });
        this.that.fetchMemesLikesAndComments(postId);
    });
  }

  dislikeMeme(memeId, postId, commentId) {
    this.likeService
    .dislike(memeId, postId, commentId)
    .subscribe((data: Meme ) => {
        this.notificationService.unlikeNotificationUpdate(postId , memeId)
        .subscribe((retour: Notification) => {
          console.log(retour);
        });
        this.fetchMemesLikesAndComments(postId);
    });
  }
}
